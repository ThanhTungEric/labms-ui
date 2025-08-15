import api from '../../config/axios';
import { LoginRequest, LoginResponse, RefreshResponse } from '../../types/auth.type';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const { data: res } = await api.post<LoginResponse>('/auth/login', data);
  return res;
}

export async function refreshAccessToken(): Promise<RefreshResponse> {
  const { data } = await api.post<RefreshResponse>('/auth/refresh');
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

// import api from '../../config/axios';
// import { LoginRequest, LoginResponse } from '../../types/auth.type';
// import { useNotification } from '../../hooks/notification/notification';

// const { notify, showSuccess, showError, showInfo, showWarning, close } = useNotification();

// export async function login(data: LoginRequest): Promise<LoginResponse> {
//   const response = await api.post<LoginResponse>('/auth/login', data);
//   return response.data;
// }


// type RefreshResponse = {
//   accessToken: string;
//   refreshToken: string;
// };



// // export async function refreshAccessToken(): Promise<void> {
// //   await api.post('/auth/refresh');
// // }
// export async function refreshAccessToken(): Promise<string | null> {
//   const refreshToken = localStorage.getItem('refreshToken');

//   if (!refreshToken) {
//     handleLogout();
//     return null;
//   }

//   try {
//     const response = await api.post('/auth/refresh', {}, {
//       headers: {
//         'X-Refresh-Token': refreshToken,
//       },
//     });

//     const { accessToken, refreshToken: newRefreshToken } = response.data as RefreshResponse;

//     if (accessToken) {
//       localStorage.setItem('accessToken', accessToken);
//     }

//     if (newRefreshToken) {
//       localStorage.setItem('refreshToken', newRefreshToken);
//     }

//     return accessToken;
//   } catch (err: any) {
//     if (err.response?.status === 401) {
//       showWarning('Refresh token expired or invalid',err);
//     } else {
//       showWarning('Refresh token expired or invalid', err);
//     }
//     handleLogout();
//     return null;
//   }
// }

// function handleLogout() {
//   localStorage.clear();
//   window.location.href = '/auth/login';
// }

// export async function logout(): Promise<void> {
//   await api.post('/auth/logout');
// }