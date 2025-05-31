// Add MessageChannel polyfill for Cloudflare Workers
if (typeof MessageChannel === 'undefined') {
    globalThis.MessageChannel = class MessageChannel {
      constructor() {
        this.port1 = {
          onmessage: null,
          postMessage(data) {
            if (this.port2.onmessage) {
              const event = { data };
              this.port2.onmessage(event);
            }
          }
        };
        this.port2 = {
          onmessage: null,
          postMessage(data) {
            if (this.port1.onmessage) {
              const event = { data };
              this.port1.onmessage(event);
            }
          }
        };
      }
    };
  }
  