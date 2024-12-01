export const concatImage = (url?: string) => {
    return `${import.meta.env.VITE_URL_LINKS_NO_SPLASH}${url}`
}

export function formatMoney(value?: any) {
    const number = parseFloat(value);
    
    if (isNaN(number)) {
            return 0
        }
        
    return  `${number.toLocaleString('en-US')} VNĐ`;
}

export function formatID(value?: any) {
    const number = parseFloat(value);
    if (isNaN(number)) {
            return 0
        }
  return number.toString().padStart(5, '0');
}

export const formatCurrency = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
};

export const parseCurrency = (value) => {
  return value.replace(/,/g, '');
};


export const getUserEmployeeId = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user?.employee_id || '';
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return '';
    }
  }
  return '';
};
export const getUserDepartment = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user?.hod_department || '';
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return '';
    }
  }
  return '';
};

export const normalizeText =(text: string) => {
  // Chuyển về chữ thường
  text = text.toLowerCase();
  // Bỏ dấu tiếng Việt
  text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Bỏ khoảng trắng
  text = text.replace(/\s+/g, '');
  return text;
}

export const compareText = (text1?: string, text2?: string) => {
  if(text1 && text2){
    return normalizeText(text1) === normalizeText(text2);
  } return false
}

