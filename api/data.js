
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'web-payment';
  const REPO_NAME = 'add-nomor';
  const FILE_PATH = 'code.json';

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Gagal mengambil data dari GitHub' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
}
