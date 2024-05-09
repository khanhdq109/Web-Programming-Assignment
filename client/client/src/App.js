import React from 'react';
import { Main } from './pages/admin/Layout/Main';
import { Register } from './pages/admin/Login/Register';


function App() {
    return (
        <div className="App">
          {/* <Header/>
          <main>
            <Homepage />
          </main> */}
          {/* Sau này chỗ này cần tạo router và layout để quản lý việc chuyển trang */}
          <Main>
            <Register />
          </Main>
        </div>
      );
    }    

export default App;
