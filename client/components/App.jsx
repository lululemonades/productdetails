import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Facebook } from 'styled-icons/fa-brands/Facebook';
import { Twitter } from 'styled-icons/fa-brands/Twitter';
import { Tumblr } from 'styled-icons/fa-brands/Tumblr';
import { Google } from 'styled-icons/fa-brands/Google';
import { Mail } from 'styled-icons/feather/Mail';
import Colors from './Colors';
import Sizes from './Sizes';
import ItemMaterial from './ItemMaterial';

/* ************************* STYLED-COMPONENTS ************************* */
const Theme = styled.div`
    font-family: 'Josefin Sans', sans-serif;
    font-weight: normal;
    margin: 30px;
    background-color: #fafafa;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
`;

/* *******************     PRODUCT DETAILS       *********************** */
const ProductDetails = styled.div`
    height: auto;
    width: 30%;
    min-width: 317px;
    max-width: 450px;
    margin: 60px;
    background-color: #fafafa
    float: right;
`;

const ProductDetailsContainer = styled.div`
  margin:20px;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 25pt;
  transform: scale(1, 1.1);
`;

const Span = styled.span`
  font-weight: 300;
  font-family: 'Josefin Sans', sans-serif;
  display: block;
  padding-bottom: 47px;
  font-size: 14pt;
`;

const Description = styled.p`
  font-size: 11.5pt;
  font-weight: 400;
  line-height: 17px;
  padding-bottom: 25px;
  border-bottom:1px solid #e0e0e0;
  margin-bottom: 10px;
`;

const WhyWeMadeThis = styled.div`
  font-size: 14pt;
  transform: scale(1, 1.1);
  padding-bottom: 18px;
`;

/* **************   ADD TO BAG + FINDINSTORE BUTTONS  ******************** */
const Button = styled.button`
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 700;
  padding: 15px 17px 13px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1.4px;
  width: 100%;
`;

const AddToBag = Button.extend`
  background-color: #d22030;
  border: 1px solid #d22030;
  color: #fff;
  margin-top: 10px;
`;

const FindInStore = Button.extend`
  background-color: #fff;
  border: 1px solid #000;
  margin-top: 10px;
`;

/* ********************  SHARE-LIVECHAT-REVIEWS  ************************* */
const ShareLiveChatReview = styled.button`
  font-size: 12pt;
  font-family: 'Josefin Sans';
  background-color: transparent;
  background-repeat: no-repeat;
  padding: 15px 21px;
  cursor: pointer;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  overflow: hidden;
  width: 100%;
  display: inline-block;
`;

const Inner = styled.div`
  display: inline-block;
`;

const ShareLiveChatReviewDiv = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
  justify-content:center;
`;

const FacebookIcon = Facebook.extend`
  height: 10px;
  width: 20px;
`;

const TwitterIcon = Twitter.extend`
  height: 10px;
  width: 20px;
`;

const TumblrIcon = Tumblr.extend`
  height: 10px;
  width: 20px;
`;

const GoogleIcon = Google.extend`
  height: 10px;
  width: 20px;
`;

const MailIcon = Mail.extend`
  height: 10px;
  width: 20px;
`;

/* ************************** APP COMPONENT ******************************* */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      itemId: 1,
      share: false,
    };
  }

  componentDidMount() {
    axios.get(`/productDetails/${this.state.itemId}`)
      .then((response) => {
        // console.log('look', response.data);
        this.setState({
          products: [...response.data],
        });
      })
      .catch((error) => {
        console.log('your get has an error', error);
      });
  }

  toggleShare() {
    this.setState({
      share: !this.state.share,
    });
  }

  render() {
    return (
      <Theme>
        <ProductDetails>
          {
            this.state.products.map(product => (
              <ProductDetailsContainer key={product}>
                <Title>{product.title}</Title>
                <Span>{product.price}</Span>
                <WhyWeMadeThis>Why we made this</WhyWeMadeThis>
                <Description>{product.description}</Description>

                <div>
                  <Colors colors={product.color} />
                </div>

                <br />

                <div>
                  <Sizes sizes={product.size} />
                </div>

                <div>
                  <AddToBag>ADD TO BAG</AddToBag>
                  <FindInStore>FIND IN STORE</FindInStore>
                </div>

                <ShareLiveChatReviewDiv>
                  <Inner>
                    <ShareLiveChatReview onClick={() => this.toggleShare()}><Img src="https://www.dropbox.com/s/gs517cfxgfftiql/shareicon.svg?raw=1" />Share</ShareLiveChatReview>
                    {
                        this.state.share &&
                        <div>
                          <FacebookIcon />
                          <TwitterIcon />
                          {/* <PinterestIcon /> */}
                          <TumblrIcon />
                          <GoogleIcon />
                          <MailIcon />
                        </div>
                    }
                  </Inner>
                  <Inner>
                    <ShareLiveChatReview><Img src="https://www.dropbox.com/s/ridlic1h8p5vn8h/chaticon.svg?raw=1" />Live Chat</ShareLiveChatReview>
                  </Inner>
                  <Inner>
                    <ShareLiveChatReview><Img src="https://www.dropbox.com/s/u4ehp6c2f211sak/staricon.svg?raw=1" />Reviews</ShareLiveChatReview>
                  </Inner>
                </ShareLiveChatReviewDiv>

                <div>
                  <ItemMaterial
                    fabric={product.fabric}
                    care={product.care}
                    features={product.features}
                  />
                  <br />
                  <Span className="sku">SKU: {product._id}</Span>
                </div>
              </ProductDetailsContainer>
            ))
         }
        </ProductDetails>
      </Theme>
    );
  }
}

export default App;
