/**
 *
 * SliderImage
 *
 */

import React, { memo, useState, useCallback, useRef, useEffect, } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import clsx from 'clsx';
import {
  Grid,
  fade,
  Fade,
  Chip,
  Grow,
  Zoom,
  Slide,
  Avatar,
  Dialog,
  Hidden,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  Close,
  TouchApp,
  ChevronLeft,
  ChevronRight,
  FiberManualRecord,
  FiberManualRecordOutlined,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import './styles.css'
import { useWindowSize } from '../../utils/hooks';

let cx = 0
let cy = 0
let lensCurrent = null
let imageCurrent = null
let resultCurrent = null

const globalStyles = {
  flexCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(theme => ({
  SliderImage: {
    display: 'flex',
    flexDirection: 'row',    
    '@media (max-width: 600px)': {
      ...globalStyles.flexCentered,
      flexDirection: 'column',
    },
  },
  SliderImageGridItem: {
    width: '100%',
    ...globalStyles.flexCentered,
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  SliderImageUl: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',  
    overflowX: 'hidden',
    overflowY: 'scroll',
    whiteSpace: 'nowrap',
    maxHeight: theme.spacing(10) * 4,
    minHeight: theme.spacing(10) * 4,
    width: '100%',    
    '@media (max-width: 600px)': { 
      display: 'flex',
      flexDirection: 'row',     
      overflowX: 'scroll',   
      overflowY: 'hidden',   
      whiteSpace: 'nowrap',
      minHeight: '75px',
      maxHeight: 'auto',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    '@media (max-width: 960px)': { 
      display: 'flex',
      flexDirection: 'row',     
      overflowX: 'scroll',   
      overflowY: 'hidden',   
      whiteSpace: 'nowrap',
      minHeight: '75px',
      maxHeight: 'auto',
      maxWidth: '300px',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },

    '-webkit-overflow-scrolling': 'touch',
    // '&::-webkit-scrollbar': {
    //   display: 'none',
    // },
    '&::-webkit-scrollbar': {
      width: theme.spacing(0.5),
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 0px rgba(0,0,0,0.3)',
      '-webkit-border-radius': '0px',
      borderRadius: '0px',
      border: 'solid 0px rgba(0,0,0,0)',
    },
    '&::-webkit-scrollbar-thumb': {
      '-webkit-border-radius': '0px',
      'border-radius': '0px',
      'background': theme.palette.primary.main,
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
    },
    '::-webkit-scrollbar-thumb:window-inactive': {
      background: 'rgba(0,0,0,0.4)', 
    },
  },
  SliderImageImageContainer: {
    position: 'relative',
    width: '100%',
    minHeight: theme.spacing(10) * 4,
    minWidth: '250px',
    ...globalStyles.flexCentered,
    '&:hover': {
      cursor: 'none',
    },
    '@media (max-width: 600px)': {
      minWidth: 'auto',
    },
  },
  SliderImageButton: {
    position: 'absolute',
    top: '50%',
    zIndex: theme.zIndex.appBar - 1,
    color: theme.palette.primary.dark,
  },
  SliderImageButtonPrev: {
    left: -theme.spacing(5),
  },  
  SliderImageButtonNext: {
    right: -theme.spacing(5),
  },
  SliderImageButtonAlt: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.5)',
    position: 'absolute',
    top: '50%',
    zIndex: theme.zIndex.appBar - 1,    
  },
  SliderImageButtonAltPrev: {
    left: theme.spacing(2),
  },  
  SliderImageButtonAltNext: {
    right: theme.spacing(2),
  },
  SliderImageFullscreenImageContainer: {
    ...globalStyles.flexCentered,
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  SliderImageFullscreenImage: {
    position: 'absolute',     
    maxWidth: '90%',
    maxHeight: '90%',
    '&:hover': {
      cursor: 'zoom-in',
    },
  },
  SliderImageFullscreenTapLegend: {
    position: 'absolute',
    zIndex: theme.zIndex.appBar + 1,
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '50%',
    boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.5)',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    pointerEvents: 'none',
  },
  SliderImageFullscreenImageAlt: {
    ...globalStyles.flexCentered,
    position: 'absolute',    
    width: '100%',     
    maxWidth: '100%',
    height: '100%',
    backgroundColor: fade('#000', 0.8),    
    '&:hover': {
      cursor: 'zoom-out',
    },
    zIndex: theme.zIndex.appBar + 2,
  },
  SliderImageFullscreenImageAltImg: props => ({
    maxWidth: '200%',
    maxHeight: '200%',    
    // minWidth: '120%',    
    pointerEvents: 'none',
  }),
  SliderImageFullscreenImageAltImgGrabberDiv: props => ({
    ...globalStyles.flexCentered,    
    height: '100%',
    width: '100%',
    '&:hover': {
      cursor: props.isDraggingZoomedImage ? 'grabbing' : 'grab',
    },
  }),
  SliderImageFullscreenCloseIcon: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.5)',
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  SliderImageFullscreenThumbs: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
    '@media (max-width: 960px)': {
      top: 'unset',
      left: 'unset',
      bottom: theme.spacing(2),
    },
  },
  SliderImageHoverLegend: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar - 1,
    pointerEvents: 'none',
    '@media (max-width: 600px)': {
      right: '25%',
    },
  },
  SliderImageAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  SliderImageDotsNavContainer: {
    width: '100%',
    ...globalStyles.flexCentered,
  },
  SliderImageDotsIcon: {
    fontSize: 16,
    color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  SliderImageZoomContainer: props => ({
    display: props.canRenderZoom ? 'block' : 'none',
    '@media (max-width: 600px)': {
      display: 'none',
    },
    '&:hover': {
      cursor: 'grab',
    },
  }),
}));

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

function SliderImage({
  data, 
  width, 
  showDescription, 
  direction,
}) {
  const sliderTimeoutValue = 4000;
  const windowDimensions = useWindowSize();
  const [index, setIndex] = useState(0);
  const [imageHover, setImageHover] = useState(false);  
  const [renderImage, setRenderImage] = useState(true);  
  const [canRenderZoom, setCanRenderZoom] = useState(false);
  const [containerHover, setContainerHover] = useState(false);
  const [imageDragDirection, setImageDragDirection] = useState(0);  
  const [imageDragPosition, setImageDragPosition] = useState({start: null, end: null});
  const [isDraggingZoomedImage, setIsDraggingZoomedImage] = useState(false);
  const [zoomedImageDragPosition, setZoomedImageDragPosition] = useState({x: null, y: null});
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [thumbnailInterval, setThumbnailInterval] = useState(null);
  const [sliderAnimationActive, setSliderAnimationActive] = useState(null);
  const [showZoomedDragImage, setShowZoomedDragImage] = useState(false);
  const [showTapLegend, setShowTapLegend] = useState(true);
  const selectedImage = data[index];
  const refImage = useRef();
  const refLens = useRef();
  const refResult = useRef();
  const refScroll = useRef();
  const classes = useStyles({ canRenderZoom, isDraggingZoomedImage });
  
  function getCursorPos(e, imageCurrent) {
    let x = 0;
    let y = 0;
    const getBoundingImage = imageCurrent.getBoundingClientRect();

    e = e || window.event;
    x = e.pageX - getBoundingImage.left - window.pageXOffset;
    y = e.pageY - getBoundingImage.top - y - window.pageYOffset;

    return { x, y }
  };

  useEffect(() => {
    
  });

  useEffect(() => {
    const { start, end } = imageDragPosition;
    
    if (start !== null && end !== null) {
      const dx = Math.abs(end - start);
      if (dx >= 25) {
        if (end > start) {
          onPrevSlider();
          setImageDragDirection(-1000);
        } else {
          onNextSlider();
          setImageDragDirection(1000);
        }
      }
      setImageDragPosition({start: null, end: null});
    }
  }, [imageDragPosition]);

  useEffect(() => {
    setTimeout(() => {
      setCanRenderZoom(true);
    }, 1200);
  }, []);

  useEffect(() => {
    clearInterval(thumbnailInterval);    

    if (!containerHover) {
      const scrollTo = ((index) % data.length) * 75; 
      const scrollCurrent = refScroll.current;      
      
      const thumbnailScrollInterval = setInterval(() => {
        if (scrollCurrent !== undefined && scrollCurrent !== null) {
          const scrollProp = windowDimensions.width >= 960 ? 'scrollTop' : 'scrollLeft';
          const currentScrollTopPos = scrollCurrent[scrollProp];
          if (        
            currentScrollTopPos !== scrollTo
          ) {
            if (scrollTo === 0 && currentScrollTopPos !== 0) {
              scrollCurrent[scrollProp] -= 10;
            } else if (scrollTo < currentScrollTopPos) {
              scrollCurrent[scrollProp] -= 1;            
            } else {
              scrollCurrent[scrollProp] += 1;            
            }
          } else {
            clearInterval(thumbnailInterval);
          } 
        }
      }, 10);
  
      setThumbnailInterval(thumbnailScrollInterval);    
    }
  }, [index]);

  useEffect(() => {
    if (!showImageDialog) {
      if (containerHover) {
        handleRemoveSliderInterval();
      } else {
        handleSetSliderInterval();
      }
    } else {
      handleRemoveSliderInterval();
    }
  }, [containerHover, showImageDialog]);

  useEffect(() => {
    if (!renderImage) {
      setTimeout(() => {
        setRenderImage(true);
      }, 100);
    }
  }, [renderImage]);

  useEffect(() => {
    return () => {
      handleRemoveSliderInterval();
      clearInterval(thumbnailInterval);
    };
  }, []);

  const handleSetSliderInterval = () => {  
    if (data.length > 1) {
      const sliderInterval = setInterval(() => {
        onNextSlider();
      }, sliderTimeoutValue);
  
      setSliderAnimationActive(sliderInterval);
    }  
  };

  const handleRemoveSliderInterval = () => {
    clearInterval(sliderAnimationActive);
  };

  const handleOnContainerHoverStart = (e) => {
    setContainerHover(true);   
    clearInterval(thumbnailInterval); 
  };

  const handleOnContainerHoverEnd = (e) => {
    setContainerHover(false);    
  };

  useEffect(() => {
    lensCurrent = refLens.current;
    imageCurrent = refImage.current;
    resultCurrent = refResult.current;

    function moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens) {
      e.preventDefault();
      let x = 0;
      let y = 0;

      const pos = getCursorPos(e, imageCurrent);
      x = pos.x - offsetWidthLens / 2;
      y = pos.y - offsetHeightLens / 2;

      // 
      // 

      if (x > imageWidth - offsetWidthLens) {
        x = imageWidth - offsetWidthLens;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > imageHeight - offsetHeightLens) {
        y = imageHeight - offsetHeightLens;
      }
      if (y < 0) {
        y = 0;
      }

      lensCurrent.style.left = `${x}px`;
      lensCurrent.style.top = `${y}px`;        
      resultCurrent.style.backgroundPosition = `-${x * cx}px -${y * cy}px`; 
    }

    if (imageCurrent !== null) {
      const imageWidth = imageCurrent.width;
      const imageHeight = imageCurrent.height || (imageWidth - 120);
      // 
      const offsetWidthLens = lensCurrent.offsetWidth;
      const offsetHeightLens = lensCurrent.offsetHeight;

      cx = resultCurrent.offsetWidth / offsetWidthLens;
      cy = resultCurrent.offsetHeight / offsetHeightLens;

      

      resultCurrent.style.backgroundSize = `${imageWidth * cx}px ${imageHeight * cy}px`;
                          

      imageCurrent.addEventListener('mousemove', e => moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens));
      lensCurrent.addEventListener('mousemove', e => moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens));
    }

    return () => {
      imageCurrent.removeEventListener('mousemove', moveLens);
      lensCurrent.removeEventListener('mousemove', moveLens);
    }
  });

  const onPrevSlider = useCallback(() => {    
    setIndex(prev => (prev - 1 + data.length) % data.length);
    setRenderImage(false);
  }, []);

  const onNextSlider = useCallback(() => {    
    setIndex(prev => (prev + 1) % data.length);
    setRenderImage(false);    
  }, []);

  const handleThumbnailPress = (idx) => {
    setIndex(idx);
    handleRemoveSliderInterval();
    clearInterval(thumbnailInterval);

    // if (windowDimensions.width < 960) {
    //   setContainerHover(true);
    // }
  };

  const handleDialogImageDrag = (event, info, type) => {     
    const imgPos = {...imageDragPosition};
    imgPos[type] = info.point.x;
    setImageDragPosition(imgPos);
  };

  const handleDialogZoomedImageDrag = (event, info) => {
    setZoomedImageDragPosition({
      x: info.point.x,
      y: info.point.y,
    });
  };

  const handleDialogImageTap = (e) => {
    const { start, end } = imageDragPosition;
    
    if (start === null && end === null) {      
      setShowZoomedDragImage(true);
    } else {      
      setShowZoomedDragImage(false);
    }
  };

  const handleDialogZoomedImageTap = (e) => {
    const { x, y } = zoomedImageDragPosition;
    
    if (x === null && y === null) {      
      setShowZoomedDragImage(false);
    } else {      
      setZoomedImageDragPosition({x: null, y: null});
    }
  };

  const renderOpenImageDialog = () => (
    showImageDialog ?
    <Dialog
      fullScreen
      open={showImageDialog}
      onClose={handleToggleShowImageDialog}
    >
      <div
        className={classes.SliderImageFullscreenImageContainer}
      >
        <Zoom
          in={showTapLegend}
          timeout={showTapLegend ? 600 : 200}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={classes.SliderImageFullscreenTapLegend}
          >
            <TouchApp />
          </div>
        </Zoom>
        <IconButton
          className={classes.SliderImageFullscreenCloseIcon}
          onClick={handleToggleShowImageDialog}
        >
          <Close />
        </IconButton> 
        <div
          className={classes.SliderImageFullscreenThumbs}
        >
          {renderThumbnails()}
        </div>
        <AnimatePresence
          initial={false}
          custom={imageDragDirection}
        >
          <motion.img
            key={index}
            src={selectedImage.image}
            custom={imageDragDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 200 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={(event, info) => handleDialogImageDrag(event, info, 'start')}
            onDragEnd={(event, info) => handleDialogImageDrag(event, info, 'end')}
            onTap={handleDialogImageTap}            
            className={classes.SliderImageFullscreenImage}                        
          />
        </AnimatePresence>
        <Fade
          in={showZoomedDragImage}
          mountOnEnter
          unmountOnExit
        >
          <motion.div
            className={classes.SliderImageFullscreenImageAlt}
            onTap={handleDialogZoomedImageTap}
          >
            <motion.div
              drag
              dragConstraints={{ 
                left: -(windowDimensions.width * 0.25), 
                right: (windowDimensions.width * 0.25), 
                top: -(windowDimensions.height * 0.25), 
                bottom: (windowDimensions.height * 0.25) 
              }}
              dragElastic={1}
              onDrag={(event, info) => handleDialogZoomedImageDrag(event, info)}  
              onDragStart={(event, info) => setIsDraggingZoomedImage(true)}
              onDragEnd={(event, info) => setIsDraggingZoomedImage(false)}
              className={classes.SliderImageFullscreenImageAltImgGrabberDiv}              
            >
              <motion.img
                src={selectedImage.image}
                className={classes.SliderImageFullscreenImageAltImg}                
              />
            </motion.div>
          </motion.div>
        </Fade>
      </div>
    </Dialog> :
    null
  );

  const renderThumbnails = () => (
    <ul 
      id="image-slider-ul"
      ref={refScroll}
      className={clsx("react-slider__ul", classes.SliderImageUl)}
      onTouchStart={handleOnContainerHoverStart}
      onTouchEnd={handleOnContainerHoverEnd}
    >
      {data.map((item, idx) => (
        <motion.li 
          key={idx}
          whileHover={{ 
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          className={idx === index ? 'active' : ''} 
          onClick={() => handleThumbnailPress(idx)}
        >
          <Avatar 
            src={item.image} 
            variant="square"
            className={classes.SliderImageAvatar}
          />
        </motion.li>
      ))}
    </ul>
  );

  const handleOnHoverStart = (e) => {
    setImageHover(true);
  };

  const handleOnHoverEnd = (e) => {
    setImageHover(false);
  };

  const renderHoverLegendChip = () => (
    <Chip
      color="secondary"
      label={"Presiona para abrir"}
      icon={<TouchApp />}
      className={classes.SliderImageHoverLegend}
    />
  );

  const renderHoverLegend = () => (
    <Fade
      in={imageHover}
      mountOnEnter
      unmountOnExit
    >
      {renderHoverLegendChip()}
    </Fade>
  );

  const renderImageDotsNavigation = () => (
    data.length > 1 ?
    <div
      className={classes.SliderImageDotsNavContainer}
    >
      {
        data.map((img, idx) => {
          const Icon = idx === index ? FiberManualRecord : FiberManualRecordOutlined;

          return (
            <Icon
              key={`${img.url}-${idx}`}
              className={classes.SliderImageDotsIcon}
              onClick={() => handleThumbnailPress(idx)}
            />
          );
        })
      }
    </div> :
    null
  );

  const handleToggleShowImageDialog = () => {
    if (!showImageDialog) {
      setTimeout(() => {
        setShowTapLegend(false);
      }, 1000);
    } else {
      setShowTapLegend(true);
    }

    setShowImageDialog(prev => !prev);
  };

  return (
    <motion.div      
      onHoverStart={handleOnContainerHoverStart}
      onHoverEnd={handleOnContainerHoverEnd}
      onTouchStart={handleOnContainerHoverStart}
      onTouchEnd={handleOnContainerHoverEnd}
    >
      <Grid 
        container
        // spacing={4}
        className={clsx("react-slider", classes.SliderImage)} 
        style={{width: width || 'auto'}}
      >
        {renderOpenImageDialog()}
        <Hidden
          only={['xs', 'sm']}
        >
          <Grid
            item
            xs={false} sm={false} md={3} lg={2} xl={2}
          >
            {renderThumbnails()}
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12} sm={12} md={9} lg={10} xl={10}
          className={classes.SliderImageGridItem}
        >        
          <div className="react-slider__container">
            {renderHoverLegend()}
            <Hidden
              only={['md', 'lg', 'xl']}
            >
              {renderHoverLegendChip()}
            </Hidden>
            <motion.div 
              onHoverStart={handleOnHoverStart}
              onHoverEnd={handleOnHoverEnd}
              className="react-slider__areaZoom"               
              style={{ width: '100%' }}
            > 
              <span
                onClick={handleToggleShowImageDialog}
              >
                <div className="react-slider__lens" ref={refLens} />
                <div className={classes.SliderImageImageContainer}>
                  <Grow
                    in={renderImage}                
                    timeout={renderImage ? 500 : 0}
                  >
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.image} 
                      ref={refImage}               
                    />
                  </Grow>
                </div>
              </span>           
              <motion.div
                drag={"y"}
                dragConstraints={{ top: -150, bottom: 150 }}
                ref={refResult}
                className={clsx("react-slider__imgZoom", classes.SliderImageZoomContainer)}
                style={{
                  backgroundImage: `url(${selectedImage.image})`,
                  left: `${direction === 'left' && '-107%'}`,                       
                  transition: 'opacity .3s ease-in-out',
                  width: windowDimensions.width * (windowDimensions.width >= 1125 ? (1.75/5) : (1/2)),
                  height: windowDimensions.width * (windowDimensions.width >= 1125 ? (1.75/5) : (1/2)),           
                }}
              />
            </motion.div>
            {showDescription && (
              <div className="react-slider__description">
                {selectedImage.text}
              </div>
            )}
          </div> 
          {renderImageDotsNavigation()}
        </Grid>
        <Hidden
          only={['md', 'lg', 'xl']}
        >
          <Grid
            item
            xs={12} sm={12} md={false} lg={false} xl={false}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {renderThumbnails()}
          </Grid>
        </Hidden>     
      </Grid>
    </motion.div>
  );
}

SliderImage.propTypes = {
  /** data */
  data: PropTypes.array.isRequired,
  /** left | right */
  direction: PropTypes.string,
  /** show description of image */
  showDescription: PropTypes.bool,
  /** set size slider image */
  width: PropTypes.string,
};

SliderImage.defaultProps = {
  direction: 'right',
  showDescription: true,
  width: 'auto',
};

export default memo(SliderImage);
