import './Footer.scss'
import { PhoneFilled, MailFilled, CaretRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import map from './imgs/map.png'


function Footer() {
    return (
        <footer>
            <div className="box-container bg-light">
                <div className="box box-tilte">
                    <div className='style-border-top'></div>
                    <div className='style-border-bottom'></div>
                    <p>"The more that you read, the more things you will know. The more that you learn, the more places you'll go"</p>
                </div>
                <div className="box">
                    <h3>Contact Us</h3>
                    <div className='box-contact'><PhoneFilled className='color-orange icons-g' /><p>Hotline: 1999-1010</p></div>
                    <div className='box-contact'><MailFilled className='color-orange icons-g' /><p>Mail: books@gmail.com</p></div>
                </div>
                <div className="box box-img">
                    <h3>International Delivery</h3>
                    <img src={map} alt="" />
                </div>
                <div className="box box-links">
                    <h3>Quick Links</h3>
                    <div className='link-items'><Link className='links' to=''>Home</Link></div>
                    <div className='link-items'><Link className='links' to=''>Product</Link></div>
                   
                    <div className='link-items'><Link className='links' to=''>News</Link></div>
                    
                </div>
            </div>
        </footer>
    );
}

export default Footer;