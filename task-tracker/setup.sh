if [ ! -d "node_modules" ]; then
    echo "...installing dependencies"
    npm i
    echo "dependencies installation complete"
fi
echo "...Building the application"
npm run build
echo "Build complete"
exit 0
