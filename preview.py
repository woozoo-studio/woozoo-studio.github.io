"""Local preview with file-change detection. No third-party dependencies."""
import hashlib
import json
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def do_GET(self):
        if self.path == '/__version':
            files = sorted(p for p in ROOT.rglob('*') if p.suffix in ('.html', '.css', '.js') and '.git' not in p.parts)
            version = hashlib.sha256(json.dumps([(str(p), p.stat().st_mtime_ns) for p in files]).encode()).hexdigest().encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(version)
        else:
            super().do_GET()

if __name__ == '__main__':
    print('Local preview: http://127.0.0.1:4173', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4173), Handler).serve_forever()
