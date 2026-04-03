# Daring Stickman - iOS App

A native iOS wrapper that runs the Daring Stickman web game inside a WKWebView.

## Requirements

- Xcode 15 or later
- iOS 16.0+ deployment target

## How to Build and Run

1. Open the Xcode project:
   ```
   open DaringStickman.xcodeproj
   ```

2. Select a simulator or connected device from the scheme selector.

3. Press **Cmd+R** to build and run.

The project references the web game files (index.html, audio, fonts) from the parent directory (`../`). These are copied into the app bundle at build time as resources.

## Project Structure

- `DaringStickman/DaringStickmanApp.swift` - SwiftUI app entry point
- `DaringStickman/ContentView.swift` - Main view that hosts the WKWebView
- `DaringStickman/WebView.swift` - UIViewRepresentable wrapper for WKWebView
- `DaringStickman/Info.plist` - App configuration (orientations, display name, etc.)

## Notes

- The app supports all orientations (portrait and landscape).
- Inline audio playback is enabled so game sounds work without user interaction.
- The status bar is hidden for a full-screen game experience.
