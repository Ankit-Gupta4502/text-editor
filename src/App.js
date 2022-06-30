import { useState,useEffect } from "react";
import {CgMenuLeftAlt} from 'react-icons/cg'
import {AiOutlineAlignCenter,AiOutlineAlignRight,AiOutlineMenu} from 'react-icons/ai'

import WebFont from "webfontloader";

function App() {
  const[activeFont,setActiveFont] = useState({})
  const [fonts,setFonts] = useState([])
  const [styles,setStyles] =useState({fontFamily:activeFont?.family,fontWeight:'normal',size:16,lineHeight:22,letterSpacing:2,aligned:'left'}) 


  // https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAeXBP3DVW30BTPOMFaXj9w84Dw8LJaO1M

  useEffect(() => {
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_API_KEY}`)
    .then((resp)=>resp.json())
    .then((resp)=>setFonts(resp.items))
  }, [])

  useEffect(()=>{
    setActiveFont(...fonts.filter((font)=>font.family==='Roboto'))
  },[fonts])

  useEffect(() => {
      WebFont.load({
        google:{
          families:['Roboto',(activeFont?.family||'')],
        }
      })
  }, [activeFont])
  


  

  const handleChange = (e) =>{
    const {name,value} = e.target 
    setStyles({...styles,[name]:value})
  }

  const style = {
    transition:'all 350ms',
    fontFamily:activeFont?.family,
    fontWeight:styles?.fontWeight,
    fontSize:`${styles.size}px`,
    lineHeight:`${styles.lineHeight}px`,
    letterSpacing:`${styles.letterSpacing}px`,
    textAlign:styles.aligned
  }

  const handleFontChange = (e) =>{
    if (e.target.name==='fontWeight') {
      // setActiveFont({....font})
    }
    setActiveFont(...fonts.filter((font)=>font.family===e.target.value))
  }

  return (
    <div className="markdown-container" >
      <div className="markdown-wrapper">
        <div className="markdown_outer">
          <div className="markdown-inner">
            <span className="label">Text</span>
            <p style={style} >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos error architecto amet earum dolores fugit deserunt incidunt delectus asperiores, facere quo maxime magnam voluptas minus voluptate consequuntur sit, ut placeat illum ab quis corporis non labore voluptatum. </p>
          </div>
        </div>

      </div>
      <div className="markdown-style-container">
        <div className="input-container">
          <label htmlFor="">Font Family</label>
          <select  id="" className="field" value={styles?.fontFamily} onChange={handleFontChange}  >
            <option value={activeFont?.family}>{activeFont?.family}</option>
            {
              fonts.map((font)=>{
                return <option value={font?.family} key={font.id} > {font?.family} </option>
              })
            }            
          </select>
        </div>

        <div className="fields-container flex align-center">
          <div className="input-container">
            <label htmlFor="">Font Weight</label>
            <select name="fontWeight" value={styles.fontWeight}  onChange={handleChange} className="field" >
              <option value="normal">normal</option>
              {
                (activeFont?.variants?activeFont?.variants:[]).map((variant)=>{
                  return <option value={variant} key={variant.id} >{variant}</option>
                })
              }
              
              
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="">Size</label>
            <input type='number' className="field" name="size" value={styles.size} onChange={handleChange}/>


          </div>
        </div>


        <div className="even-container flex align-center">
          <div className="input-container">
            <label htmlFor="">Per</label>
            <input  type='number' name="lineHeight" id="" value={styles.lineHeight} className="field" onChange={handleChange}  />
          </div>

          <div className="input-container">
            <label htmlFor="">Px</label>
            <input className="field" type='number' name="letterSpacing" value={styles.letterSpacing} onChange={handleChange} />
          </div>
        </div>

        <div className="icons-container align-items-center flex">
          <span  style={{color:styles.aligned==='left'?'hotpink':'#000'}} onClick={()=>setStyles({...styles,aligned:'left'})} >
            <CgMenuLeftAlt size={24} />
          </span>
          <span style={{color:styles.aligned==='center'?'hotpink':'#000'}} onClick={()=>setStyles({...styles,aligned:'center'})}>
            <AiOutlineAlignCenter size={24}/>
          </span>

          <span style={{color:styles.aligned==='right'?'hotpink':'#000'}} onClick={()=>setStyles({...styles,aligned:'right'})}>
            <AiOutlineAlignRight size={24}/>
          </span>

          <span style={{color:styles.aligned==='justify'?'hotpink':'#000'}} onClick={()=>setStyles({...styles,aligned:'justify'})}>
            <AiOutlineMenu size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
