import React from 'react';
import { Main } from './pages/admin/Layout/Main';
import { Login } from './pages/admin/Login/Login';
import MainGuest from './pages/guest/main';
import { Register } from './pages/admin/Login/Register';


function App() {
    return (
        <div className="App">
          {/* Sau này chỗ này cần tạo router và layout để quản lý việc chuyển trang */}
          {/* <Header/>
          <main>
            <Homepage />
          </main> */}
          {/* <MainGuest /> */}
          <Main>
            <Register />
          </Main>
        </div>
      );
    }    

export default App;
