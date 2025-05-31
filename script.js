// DOM elements
const videoPreview = document.getElementById('videoPreview');
const videoPlayback = document.getElementById('videoPlayback');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const saveBtn = document.getElementById('saveBtn');
const saveOptions = document.getElementById('saveOptions');
const saveLocation = document.getElementById('saveLocation');
const customPathGroup = document.getElementById('customPathGroup');
const customPath = document.getElementById('customPath');
const fileName = document.getElementById('fileName');
const confirmSaveBtn = document.getElementById('confirmSaveBtn');
const statusEl = document.getElementById('status');

// Variables
let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordingStartTime = null;

// Event listeners
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
saveBtn.addEventListener('click', showSaveOptions);
saveLocation.addEventListener('change', toggleCustomPath);
confirmSaveBtn.addEventListener('click', saveRecording);

// Initialize camera
async function initCamera() {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        videoPreview.srcObject = mediaStream;
        statusEl.textContent = 'Camera and microphone ready';
        statusEl.style.backgroundColor = '#d4edda';
        statusEl.style.color = '#155724';
    } catch (err) {
        console.error('Error accessing media devices:', err);
        statusEl.textContent = 'Error accessing camera or microphone: ' + err.message;
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

// Start recording
async function startRecording() {
    try {
        if (!mediaStream) {
            await initCamera();
        }
        
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(mediaStream, { 
            mimeType: 'video/webm; codecs=vp9' 
        });
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            videoPlayback.src = url;
            videoPlayback.style.display = 'block';
            videoPreview.style.display = 'none';
            
            // Calculate duration
            const duration = (Date.now() - recordingStartTime) / 1000;
            statusEl.textContent = `Recording stopped. Duration: ${duration.toFixed(2)} seconds`;
            statusEl.style.backgroundColor = '#d4edda';
            statusEl.style.color = '#155724';
            
            saveBtn.disabled = false;
        };
        
        mediaRecorder.start(100); // Collect data every 100ms
        recordingStartTime = Date.now();
        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        saveBtn.disabled = true;
        
        statusEl.textContent = 'Recording started...';
        statusEl.style.backgroundColor = '#fff3cd';
        statusEl.style.color = '#856404';
    } catch (err) {
        console.error('Error starting recording:', err);
        statusEl.textContent = 'Error starting recording: ' + err.message;
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

// Stop recording
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        
        // Stop all tracks in the stream
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Show save options
function showSaveOptions() {
    saveOptions.style.display = 'block';
}

// Toggle custom path input based on save location selection
function toggleCustomPath() {
    if (saveLocation.value === 'custom') {
        customPathGroup.style.display = 'block';
    } else {
        customPathGroup.style.display = 'none';
    }
}

// Save recording
function saveRecording() {
    if (recordedChunks.length === 0) {
        statusEl.textContent = 'No recording to save';
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
        return;
    }
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    
    let name = fileName.value.trim() || 'testimonial';
    if (!name.endsWith('.webm')) {
        name += '.webm';
    }
    
    const location = saveLocation.value;
    
    try {
        if (location === 'download') {
            // Download to device
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            statusEl.textContent = `Video saved as ${name} in your downloads`;
            statusEl.style.backgroundColor = '#d4edda';
            statusEl.style.color = '#155724';
        } else if (location === 'drive') {
            // Google Drive integration would require their API
            // This is just a placeholder for the actual implementation
            statusEl.textContent = 'Google Drive integration would be implemented here';
            statusEl.style.backgroundColor = '#fff3cd';
            statusEl.style.color = '#856404';
        } else if (location === 'custom') {
            // Custom path - this would require server-side implementation
            const path = customPath.value.trim();
            if (!path) {
                statusEl.textContent = 'Please enter a custom path';
                statusEl.style.backgroundColor = '#f8d7da';
                statusEl.style.color = '#721c24';
                return;
            }
            
            statusEl.textContent = `Custom path save would be implemented for: ${path}`;
            statusEl.style.backgroundColor = '#fff3cd';
            statusEl.style.color = '#856404';
        }
        
        // Reset UI
        saveOptions.style.display = 'none';
        saveBtn.disabled = true;
        fileName.value = '';
        customPath.value = '';
    } catch (err) {
        console.error('Error saving recording:', err);
        statusEl.textContent = 'Error saving recording: ' + err.message;
        statusEl.style.backgroundColor = '#f8d7da';
        statusEl.style.color = '#721c24';
    }
}

// Initialize the app
initCamera();