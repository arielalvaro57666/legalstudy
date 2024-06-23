
if [ -d "../env/" ]; then
    echo "---------------------------------------"
    echo "'env' folder already exists!"
    exit 1
fi


echo "____Creating Virtual Enviroment____"

python -m venv ../env

echo "_______Activating VirtualEnv_______"

source ../env/bin/activate

echo "___________Upgrading PIP___________"

python -m pip install --upgrade pip

echo "_______________DONE________________"
