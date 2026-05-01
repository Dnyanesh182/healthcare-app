export function parseJWT<T>(token: string): T | null {
    if (!token || typeof token !== 'string') return null;
  
    try {
      let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      let payload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(processChars)
          .join('')
      );
      return JSON.parse(payload);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  
    function processChars(char: string): string {
      return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
    }
  }
  