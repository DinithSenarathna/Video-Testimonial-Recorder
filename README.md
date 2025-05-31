# Video Testimonial Recorder

![Project Screenshot](screenshot.png) <!-- Add a screenshot if available -->

A web-based application that allows users to record video testimonials directly from their browser with options to save the recordings to different locations.

## Features

- 🎥 Real-time video preview with camera and microphone access
- ⏺️ Start/Stop recording functionality
- 💾 Save recordings to:
  - Local device (download)
  - Google Drive (placeholder implementation)
  - Custom path (placeholder implementation)
- 📝 Customizable file naming
- 🎚️ Simple, intuitive UI

## Technologies Used

- HTML5
- CSS3
- JavaScript (MediaRecorder API)
- WebRTC

## Installation

No installation required! This is a client-side web application that runs directly in the browser.

To run locally:

1. Clone this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge recommended)

## Usage

1. Click "Start Recording" to begin capturing video
2. Click "Stop Recording" when finished
3. Click "Save Video" to choose save options
4. Select save location and file name
5. Click "Confirm Save"

## Browser Support

This application uses modern web APIs and works best in:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge

Safari may require additional polyfills for full functionality.

## Limitations

- Google Drive and custom path saving are not fully implemented (placeholders only)
- Recordings are saved in WebM format by default
- Maximum recording length depends on available memory

## Future Enhancements

- Implement actual Google Drive API integration
- Add server-side component for custom path saving
- Support for additional video formats
- Video trimming/editing capabilities
- Cloud storage integration (Dropbox, OneDrive, etc.)

## Contributing

Contributions are welcome! Please open an issue or pull request for any improvements.

## License

MIT License - see [LICENSE](LICENSE) file for details

---

**Note**: This application requires camera and microphone permissions to function properly. All processing happens client-side in the browser - no video data is sent to any server unless explicitly saved to a cloud service.
