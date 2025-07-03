# 🛠️ AWS IAM Setup and CLI Configuration

This section explains how to create a new IAM user (`fabianpg95`), assign it admin access, and configure your local AWS CLI to use it with a custom profile.

---

## 🧱 Step 1: Create the IAM User `fabianpg95`

1. Go to: [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/)
2. In the left sidebar, click **Users**
3. Click **Add users**
4. In the **User name** field, enter: fabianpg95
5. Under **Select AWS access type**, check:
  - ✅ **Access key - Programmatic access**

![alt text](image.png)

6. Click **Next: Permissions**

---

## 🛡️ Step 2: Assign Permissions to the User

1. In the **Permissions** step, select:
- 🔘 **Attach existing policies directly**

2. Search for and check the box next to:


> ⚠️ This gives full admin access. You can later replace it with more granular permissions.

3. Click **Next: Tags** (optional)
4. Click **Next: Review**
5. Click **Create user**

---

## 🔑 Step 3: Save Your IAM Credentials

After the user is created, you'll see:

- **Access key ID**
- **Secret access key**

> ⚠️ **Important**: Copy and save these credentials securely (e.g., a password manager).  
> The **Secret access key** will only be shown **once**.

---

## 💻 Step 4: Configure AWS CLI Profile

In your terminal, run:

```bash
aws configure --profile fabianpg95

AWS Access Key ID [None]: <your-access-key-id>
AWS Secret Access Key [None]: <your-secret-access-key>
Default region name [None]: us-east-2
Default output format [None]: json
```

## 🔍 Step 5: Verify Configuration

```aws sts get-caller-identity --profile fabianpg95```

```bash
{
  "UserId": "AIDAXXXXXXXXX",
  "Account": "345650730331",
  "Arn": "arn:aws:iam::345650730331:user/fabianpg95"
}
```



cat ~/.aws/credentials  