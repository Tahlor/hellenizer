# Hellenizer (A Greek Transliteration Chrome Extension)

This Chrome extension converts visible English characters on web pages into their Greek equivalents. It's a fun way to give any webpage a Greek flair!

## Features

- Converts English characters to Greek equivalents
- Toggle conversion on and off with a single click
- Visual feedback through the extension icon
- Saves a copy of the original text, so clicking the icon again disables the transformation
- Hovering over a word displays the original text in a tooltip

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click the extension icon in the Chrome toolbar to toggle the Greek conversion on or off.
2. When enabled, the icon will change to indicate that the conversion is active.
3. Browse any webpage, and you'll see the English characters converted to Greek.
4. Click the icon again to disable the conversion and reload the page with the original text.

## How It Works

The extension uses a content script to traverse the webpage and replace English characters with their Greek counterparts. Characters without Greek equivalents are displayed in blue. The conversion can be toggled on and off, and the state is remembered between browser sessions.

## Files

- `manifest.json`: Defines the extension's metadata and permissions.
- `background.js`: Manages the extension's state and icon.
- `content.js`: Contains the logic for converting text and modifying the page.

## Limitations

- The extension reloads the page when disabling the conversion to ensure a clean revert to the original text.
- It doesn't automatically convert new content added dynamically to the page after the initial conversion.
- Text in form inputs and contenteditable elements is not converted for usability reasons.
- Very large pages may experience a slight delay during conversion.

## Contributing

Contributions to improve the extension are welcome! Please feel free to submit pull requests or open issues to suggest enhancements or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Folder Structure:

    ./src/icons/
    ./src/js/
    ./manifest.json