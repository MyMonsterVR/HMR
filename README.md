# HMR Server

A lightweight, framework-agnostic Hot Module Replacement (HMR) server built with TypeScript. Perfect for vanilla JavaScript projects and existing codebases that need real-time file watching and live reloading without the overhead of heavy frameworks.

The purpose of this project is to help bring your legacy coding ways up to a modern standards!

> ⚠️ **Work in Progress** - This project is currently under active development. See the progress sections below for current status.

## ✨ Features (Planned)

- **Real-time file watching** - Instantly detects changes in your project files
- **WebSocket streaming** - Efficient bi-directional communication with connected clients
- **Framework-agnostic** - Works with vanilla JS, legacy projects, and any existing codebase
- **TypeScript-first** - Built with TypeScript for better developer experience
- **Lightweight** - Minimal dependencies and small footprint
- **Easy integration** - Use with any project with minimal setup

## 📋 Project Status

### ✅ Finished
- [x] Basic TypeScript configuration
- [x] Dependencies setup (chalk, chokidar, ws)
- [x] File watching
- [x] WebSocket server setup and client connections

### 🚧 To be done
- [ ] Configuration loading system
- [ ] File change handlers implementation
- [ ] Real-time change streaming to connected clients
- [ ] Client-side JavaScript library
- [ ] Event system (file-changed, file-added, file-deleted)
- [ ] File filtering and exclusion patterns
- [ ] Debouncing for rapid file changes
- [ ] Error handling and reconnection logic
- [ ] CLI interface
- [ ] Configuration file support
- [ ] Multiple watch directory support
- [ ] Custom reload strategies (CSS injection, full reload, etc.)
- [ ] Development server integration examples
- [ ] Documentation and usage examples

## 🚀 Planned Usage

### Client Integration for tampermonkey (Preview)

Add this script to your tampermonkey or similar extension:

```html
// ==UserScript==
// @name         HMR Auto-Inject
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-inject HMR client
// @author       You
// @match        http://localhost/*
// @match        http://127.0.0.1/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Only inject if not already present
    if (document.querySelector('script[src*="hmr-client.js"]')) {
        return;
    }
    
    // Check if HMR server is running before injecting
    async function checkHMRServer() {
        try {
            // Try to fetch the HMR client script with a short timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout
            
            const response = await fetch('http://localhost:8081/hmr-client.js', {
                method: 'HEAD', // Just check if server responds, don't download
                signal: controller.signal,
                cache: 'no-cache'
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                // Server is running, inject the script
                injectHMRClient();
            }
        } catch (error) {}
    }
    
    function injectHMRClient() {
        const script = document.createElement('script');
        script.src = 'http://localhost:8081/hmr-client.js';
        script.async = true;
        
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if (document.head) {
                    document.head.appendChild(script);
                }
            });
        }
    }
    
    // Wait for DOM to be ready, then check server
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkHMRServer);
    } else {
        checkHMRServer();
    }
})();
```

## 📖 Planned API Reference

### HMRServer Options

```typescript
interface HMRServerOptions {
  port?: number;           // WebSocket port (default: 3001)
  watchDirs?: string[];    // Directories to watch
  exclude?: string[];      // Patterns to exclude from watching
  debounce?: number;       // Debounce delay in ms (default: 100)
  verbose?: boolean;       // Enable verbose logging (default: false)
}
```

### Events

The server will emit the following WebSocket events:

- `file-changed` - Triggered when a watched file is modified
- `file-added` - Triggered when a new file is created
- `file-deleted` - Triggered when a file is removed
- `connection-established` - Sent when client connects successfully

## 🎯 Use Cases

- **Legacy codebases** - Add modern development experience to older projects
- **Static sites** - Enhance development workflow for static HTML/CSS/JS sites
- **Micro-frontends** - Independent HMR for different parts of your application
- **Learning projects** - Great for educational purposes and understanding HMR concepts

## 🛠️ Development

### Current Development Setup

```bash
git clone https://github.com/MyMonsterVR/HMR.git
cd HMR
npm install
```

## 🤝 Contributing

We welcome contributions! This project is in early development, so there are many opportunities to help:

- Implement core functionality
- Add tests
- Improve documentation
- Create examples
- Report bugs and issues

### Development Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- Create an [issue](https://github.com/MyMonsterVR/HMR/issues) for bug reports or feature requests
- Check the project status above to see what's currently being worked on

---

Made with ❤️ for the JavaScript community

*This project is under active development. Star the repo to follow progress!*
