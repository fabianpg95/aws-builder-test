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
        const response = await fetch('https://bved09kvhd.execute-api.us-east-2.amazonaws.com/dev/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJraWQiOiJOUjZDN2ZpUTV2ZlJ4ZUNNZzNjc1pFY3ZWeXpJd0NOUFp4VlY1NmVheUo0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNWRwdGJucHZuZHRwOHY5ajJ1MGQ2NnE2OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiZGVmYXVsdC1tMm0tcmVzb3VyY2Utc2VydmVyLThmd3puY1wvcmVhZCIsImF1dGhfdGltZSI6MTc1MTQ5MjE0NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfSHc1NW4wTDg2IiwiZXhwIjoxNzUxNDk1NzQ1LCJpYXQiOjE3NTE0OTIxNDUsInZlcnNpb24iOjIsImp0aSI6IjJiYTgxNTE5LTBiMmEtNDg2MS1hM2JjLTkzNDZlYzBkYjRjNSIsImNsaWVudF9pZCI6IjM1ZHB0Ym5wdm5kdHA4djlqMnUwZDY2cTY5In0.hoBtYGG8fdCiiD0Lidnqrz0OJzJaseeTwdj-Vq5NH6hwcXjIZKtqvS618Gn0GRpVau671IF5AMIJzb8pRXAViDsmuWbcNJXdE41o_lNJTtZsLgscWVs_72gQdz9ICBE7wWsIfnCM3Mkvc9Xhph4Hrk8tDQuEzFD2C1K_mQp7KnJkuhWo1oSIZfO6GinsX2hVyIjEMb-084--sVf_YTujBP6FZm9Rl6G-P3SyEQyk3Iur5iIo3qL2ExWHB8xXsYL91BkD-xG0O9L2pZlO9CvOfrtzjSInYAj_EeshBCYwnaE4ahAt-UBKhdTOJCU-gzIB0SUt8vFlffXRgkpBlsdSmA' // if using Cognito auth
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
