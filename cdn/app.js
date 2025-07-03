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
      const base64Content = e.target.result.split(',')[1];
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
            'Authorization': 'Bearer eyJraWQiOiJOUjZDN2ZpUTV2ZlJ4ZUNNZzNjc1pFY3ZWeXpJd0NOUFp4VlY1NmVheUo0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNWRwdGJucHZuZHRwOHY5ajJ1MGQ2NnE2OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiZGVmYXVsdC1tMm0tcmVzb3VyY2Utc2VydmVyLThmd3puY1wvcmVhZCIsImF1dGhfdGltZSI6MTc1MTUxMzAwNywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfSHc1NW4wTDg2IiwiZXhwIjoxNzUxNTE2NjA3LCJpYXQiOjE3NTE1MTMwMDcsInZlcnNpb24iOjIsImp0aSI6IjJmOTU4NzU0LTQyOWUtNDA1Ni04YWJmLTlhYWIzY2YzOTk3ZCIsImNsaWVudF9pZCI6IjM1ZHB0Ym5wdm5kdHA4djlqMnUwZDY2cTY5In0.OKv0ObcxeavDdO_0O2Q-27SVaEb6t3tQ4hIUJYpWdgGKxF1f0jnoVyFGmHQRmbgVPfpikwUy-XvSDb4gqxRM0L09lTpj0MtvNnz15Y9tq6l9H_xdCSrJLehkB7Cv1HFoSawEVvnzzgyyr-lJFMstQho5fg-f9JpL_1v4ZPsQOExAxhWzinGnIoG05ysYxXmRP7_BOQYeKwa66Fg2LWzgHMSr-h70UuLbnOMCmkv924E-uKwy7jh6IQUg0kG3vZK_ViZOsG_Q3JwK5IfJGWASeoZ7lXVJGW2TYxEgRPx47DsfsyFqFf7T4b0DlnL5t5DwqAYkYVbKk8rLB6UpbIFmDw"' // if using Cognito auth
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        statusDiv.textContent = response.ok
          ? `✅ Upload successful! File ID: ${data.file_id}`
          : `❌ Upload failed: ${data.message || 'Unknown error'}`;
      } catch (err) {
        statusDiv.textContent = `⚠️ Error: ${err.message}`;
      }
    };

    reader.readAsDataURL(file);
  });
});
