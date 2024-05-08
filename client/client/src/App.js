import React from 'react';
import { Main } from './pages/admin/Layout/Main';
import { Login } from './pages/admin/Login/Login';
import MainGuest from './pages/guest/main';


function App() {
    return (
        <div className="App">
          {/* <Header/>
          <main>
            <Homepage />
          </main> */}
          {/* Sau này chỗ này cần tạo router và layout để quản lý việc chuyển trang */}
          <Main>
            <MainGuest />
          </Main>
        </div>
      );
    }    

export default App;
