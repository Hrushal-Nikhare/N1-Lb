import os
import json
import zipfile
import shutil

# Define the directory and manifest file
dir_path = os.getcwd() + "/extension"
clone_dir_path = os.getcwd() + "/extension-firefox"
extension_key = os.getcwd() + "/extension.pem"

# Remove the clone directory if it exists
if os.path.exists(clone_dir_path):
    shutil.rmtree(clone_dir_path)

# copy the extension directory
shutil.copytree(dir_path, clone_dir_path)

manifest_file = os.path.join(clone_dir_path, "manifest.json")

# Load the existing manifest file
with open(manifest_file, "r+") as file:
    data = json.load(file)

    # Add the browser specific settings
    data["browser_specific_settings"] = {"gecko": {"id": "addon@example.com"}}

    # remove background
    data.pop("background")
    data["background"] = {"scripts": ["background.js"]}

    # Write the changes back to the manifest file
    file.seek(0)
    json.dump(data, file, indent=4)
    file.truncate()

# Create a zip file (not including the directory itself)
with zipfile.ZipFile("extension.zip", "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(clone_dir_path):
        for file in files:
            zipf.write(
                os.path.join(root, file),
                arcname=os.path.relpath(os.path.join(root, file), clone_dir_path),
            )
