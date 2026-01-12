const createRequest = async (options = {}) => {
  const { method, data, url } = options;

  try {
    const response = await fetch(
      url,
      data
        ? {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        : {
            method,
          },
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const contentLength = response.headers.get('Content-Length');
    if (!contentLength || contentLength === 0) {
      return null;
    }

    return await response.json();
  } finally {
    /* empty */
  }
};

export default createRequest;
