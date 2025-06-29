document.addEventListener('DOMContentLoaded', () => {
  const uploadBtn = document.getElementById('uploadBtn');
  const fileInput = document.getElementById('fileInput');
  const statusDiv = document.getElementById('status');

  uploadBtn.addEventListener('click', async () => {
    if (!fileInput.files.length) {
      statusDiv.textContent = 'Please select a file.';
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const base64Content = e.target.result.split(',')[1]; // remove prefix
      const payload = {
        file_name: file.name,
        file_content: base64Content,
      };

      statusDiv.textContent = 'Uploading...';

      try {
        const response = await fetch('https://YOUR_API_GATEWAY_ENDPOINT/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_COGNITO_JWT_TOKEN' // if using Cognito auth
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
          statusDiv.textContent = `Upload successful! File ID: ${data.file_id}`;
        } else {
          statusDiv.textContent = `Upload failed: ${data.message || 'Unknown error'}`;
        }
      } catch (err) {
        statusDiv.textContent = `Error: ${err.message}`;
      }
    };

    reader.readAsDataURL(file);
  });
});
