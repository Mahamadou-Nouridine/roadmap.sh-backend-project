if [ ! -d "dist" ]; then
    # echo "Building..."
    # npm run build
    # echo "Building successfull"
    echo "Make sure to build the application before running the command"
    echo "use ./setup.sh to setup the entire application (dependency installation and build)"
    exit
fi

./dist/index.js "$@"
