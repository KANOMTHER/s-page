const getCookie = (name: string) => {
  const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookie ? cookie.pop() : '';
}

export default getCookie;