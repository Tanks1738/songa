# Navigate to your project folder
cd "C:\Users\Tanaka\react-admin"

# Stage only tracked files (like src/db.js, server.js, etc.)
git add src/db.js
git add src/server.js
git add package.json

# Commit with a clear message
git commit -m "Fix MySQL connection: use env vars and SSL"

# Push to GitHub main branch
git push origin main