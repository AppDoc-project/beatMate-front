import PropTypes from 'prop-types';
import * as React from 'react';
import Svg, { G, Rect, Path, Defs, Mask } from 'react-native-svg';

function LoginBtn(props) {
  const { backColor, fontColor } = props;

  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_465_157)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="#144182" />
      </G>
      <Path
        d="M159.574 41.306h11.732v1.512h-11.732v-1.512zm4.914-2.45h1.862v3.066h-1.862v-3.066zm-3.598-6.734h9.1v4.312h-7.224v2.184h-1.848v-3.64h7.224v-1.386h-7.252v-1.47zm.028 5.754h9.366v1.498h-9.366v-1.498zm12.725-5.404h8.218v1.47h-8.218v-1.47zm-1.19 8.568h11.718v1.512h-11.718V41.04zm8.428-8.568h1.848v1.54c0 1.82 0 3.584-.462 6.244l-1.862-.154c.476-2.492.476-4.34.476-6.09v-1.54zm13.341-1.176h1.876v9.31h-1.876v-9.31zm-6.762 11.242h8.96v1.484h-8.96v-1.484zm0-2.87h1.862v3.472h-1.862v-3.472zm1.582-7.56c1.988 0 3.514 1.372 3.514 3.29 0 1.904-1.526 3.29-3.514 3.29-1.988 0-3.528-1.386-3.528-3.29 0-1.918 1.54-3.29 3.528-3.29zm0 1.61c-.966 0-1.708.616-1.708 1.68 0 1.05.742 1.666 1.708 1.666.952 0 1.694-.616 1.694-1.666 0-1.064-.742-1.68-1.694-1.68z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

LoginBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

function FinishBtn(props) {
  const { backColor, fontColor } = props;
  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_29_314)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="navy" />
      </G>
      <Path
        d="M156.574 38.204h11.732v1.512h-11.732v-1.512zm1.414-2.366h8.988v1.47h-8.988v-1.47zm0-3.206h8.918v1.484h-7.07v2.45h-1.848v-3.934zm4.41 7.854c2.8 0 4.494.854 4.494 2.38 0 1.526-1.694 2.38-4.494 2.38s-4.508-.854-4.508-2.38c0-1.526 1.708-2.38 4.508-2.38zm0 1.4c-1.736 0-2.618.322-2.618.98 0 .672.882.966 2.618.966 1.736 0 2.618-.294 2.618-.966 0-.658-.882-.98-2.618-.98zm7.041-2.66h11.746v1.484h-11.746v-1.484zm1.442-6.692h8.876v3.514h-7.014v1.4h-1.848v-2.716h7.028v-.784h-7.042v-1.414zm.014 4.354h9.114v1.414h-9.114v-1.414zm3.486.686h1.862v2.464h-1.862v-2.464zm-3.64 3.864h9.1v3.766h-1.862v-2.296h-7.238v-1.47zm19.893-9.156h1.848v12.964h-1.848V32.282zm1.428 5.054h2.296v1.554h-2.296v-1.554zm-9.8-3.136h7.546v1.484h-7.546V34.2zm3.794 2.212c1.89 0 3.29 1.288 3.29 3.094 0 1.806-1.4 3.094-3.29 3.094-1.89 0-3.29-1.288-3.29-3.094 0-1.806 1.4-3.094 3.29-3.094zm0 1.512c-.882 0-1.512.588-1.512 1.582 0 .994.63 1.582 1.512 1.582s1.512-.588 1.512-1.582c0-.994-.63-1.582-1.512-1.582zm-.938-5.432h1.862v2.268h-1.862v-2.268zm19.011-.21h1.876v12.964h-1.876V32.282zm-3.822 1.344h1.848c0 3.962-1.344 7.21-5.95 9.436l-.966-1.484c3.724-1.792 5.068-4.144 5.068-7.616v-.336zm-4.382 0h5.264v1.47h-5.264v-1.47z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

FinishBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

function GetReAuthCodeBtn(props) {
  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_32_315)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill="#fff" />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="navy" />
      </G>
      <Path
        d="M135.464 31.296h1.876v9.31h-1.876v-9.31zm-6.762 11.242h8.96v1.484h-8.96v-1.484zm0-2.87h1.862v3.472h-1.862v-3.472zm1.582-7.56c1.988 0 3.514 1.372 3.514 3.29 0 1.904-1.526 3.29-3.514 3.29-1.988 0-3.528-1.386-3.528-3.29 0-1.918 1.54-3.29 3.528-3.29zm0 1.61c-.966 0-1.708.616-1.708 1.68 0 1.05.742 1.666 1.708 1.666.952 0 1.694-.616 1.694-1.666 0-1.064-.742-1.68-1.694-1.68zm9.155 3.542h11.718v1.47h-11.718v-1.47zm5.838 2.184c2.8 0 4.494.882 4.494 2.408 0 1.526-1.694 2.394-4.494 2.394s-4.508-.868-4.508-2.394c0-1.526 1.708-2.408 4.508-2.408zm0 1.442c-1.736 0-2.618.294-2.618.966 0 .658.882.966 2.618.966 1.736 0 2.618-.308 2.618-.966 0-.672-.882-.966-2.618-.966zm-1.26-8.274h1.652v.322c0 1.932-1.75 3.542-5.096 3.836l-.644-1.442c2.842-.252 4.088-1.386 4.088-2.394v-.322zm.91 0h1.652v.322c0 1.008 1.232 2.142 4.088 2.394l-.644 1.442c-3.332-.294-5.096-1.89-5.096-3.836v-.322zm-4.424-.728h9.604v1.47h-9.604v-1.47zm17.947 2.842h3.332v1.484h-3.332v-1.484zm2.856-3.43h1.862v9.562h-1.862v-9.562zm-6.72 11.242h8.862v1.484h-8.862v-1.484zm0-2.618h1.876v3.472h-1.876V39.92zm-1.722-7.784h1.848v1.974h2.464v-1.974h1.82v6.692h-6.132v-6.692zm1.848 3.388v1.834h2.464v-1.834h-2.464zm10.989-2.632h10.696v1.484h-10.696v-1.484zm-.49 8.554h11.732v1.498h-11.732v-1.498zm4.914-1.708h1.848v2.296h-1.848v-2.296zm.91-4.802c2.702 0 4.396.938 4.396 2.534 0 1.596-1.694 2.534-4.396 2.534s-4.396-.938-4.396-2.534c0-1.596 1.694-2.534 4.396-2.534zm0 1.442c-1.624 0-2.492.35-2.492 1.092 0 .742.868 1.078 2.492 1.078s2.492-.336 2.492-1.078-.868-1.092-2.492-1.092zm-.91-4.956h1.848v2.394h-1.848v-2.394zm20.587-.14h1.764v12.964h-1.764V31.282zm-1.554 4.97h2.156v1.512h-2.156v-1.512zm-1.232-4.774h1.736v12.18h-1.736v-12.18zm-4.368 1.82h1.414v1.148c0 3.206-.7 6.034-2.856 7.336l-1.12-1.428c1.946-1.12 2.562-3.416 2.562-5.908v-1.148zm.378 0h1.428v1.148c0 2.282.658 4.438 2.59 5.446l-1.064 1.414c-2.184-1.176-2.954-3.85-2.954-6.86v-1.148zm-2.52-.7h5.894v1.498h-5.894v-1.498zm13.088-.742h1.848v1.526h2.534v-1.526h1.848v5.67h-6.23v-5.67zm1.848 2.926v1.288h2.534v-1.288h-2.534zm6.118-3.5h1.862v6.58h-1.862v-6.58zm1.106 2.492h2.464v1.512h-2.464v-1.512zm-7.812 4.592h8.568v3.528h-6.692v1.54h-1.848v-2.87h6.706v-.77h-6.734v-1.428zm.028 4.354h8.918v1.442h-8.918V42.72zm12.613-4.06h1.834v1.358h5.25V38.66h1.848v5.446h-8.932V38.66zm1.834 2.786v1.176h5.25v-1.176h-5.25zm-1.792-9.646h8.218v1.484h-8.218V31.8zm-1.428 4.536h11.732v1.498h-11.732v-1.498zm8.526-4.536h1.834v1.036c0 1.078 0 2.198-.364 3.822l-1.876.126c.406-1.666.406-2.856.406-3.948V31.8zm15.855-.518h1.862v7.56H231.4v-7.56zm1.344 2.94h2.24v1.526h-2.24v-1.526zm-9.31-2.184h1.848v1.638h2.534v-1.638h1.848v6.174h-6.23v-6.174zm1.848 3.066v1.652h2.534v-1.652h-2.534zm-.448 4.312h8.498v1.47h-6.636v2.786h-1.862v-4.256zm0 3.206h8.75v1.47h-8.75v-1.47zm20.033-11.34h1.876v12.964h-1.876V31.282zm-3.822 1.344h1.848c0 3.962-1.344 7.21-5.95 9.436l-.966-1.484c3.724-1.792 5.068-4.144 5.068-7.616v-.336zm-4.382 0h5.264v1.47h-5.264v-1.47z"
        fill="navy"
      />
      <Defs></Defs>
    </Svg>
  );
}

function JoinBtn(props) {
  const { backColor, fontColor } = props;
  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_518_160)">
        <G filter="url(#filter1_d_518_160)">
          <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
          <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="#144182" />
        </G>
      </G>
      <Path
        d="M163.848 32.268h1.876v12.964h-1.876V32.268zm1.386 4.956h2.282v1.526h-2.282v-1.526zm-4.788-3.612h1.82c0 3.892-1.484 7.224-5.796 9.394l-1.036-1.414c3.402-1.764 5.012-4.144 5.012-7.658v-.322zm-4.298 0h5.25v1.498h-5.25v-1.498zm21.195-1.33h1.876v6.972h-1.876v-6.972zm-6.748 7.532h1.834v1.204h4.942v-1.204h1.848v5.292h-8.624v-5.292zm1.834 2.632v1.176h4.942v-1.176h-4.942zm-.266-9.632c2.016 0 3.514 1.274 3.514 3.066 0 1.792-1.498 3.066-3.514 3.066s-3.528-1.274-3.528-3.066c0-1.792 1.512-3.066 3.528-3.066zm0 1.54c-.994 0-1.708.574-1.708 1.526 0 .966.714 1.526 1.708 1.526.98 0 1.694-.56 1.694-1.526 0-.952-.714-1.526-1.694-1.526zm17.471-2.072h1.848v12.964h-1.848V32.282zm1.428 5.054h2.296v1.554h-2.296v-1.554zm-9.8-3.136h7.546v1.484h-7.546V34.2zm3.794 2.212c1.89 0 3.29 1.288 3.29 3.094 0 1.806-1.4 3.094-3.29 3.094-1.89 0-3.29-1.288-3.29-3.094 0-1.806 1.4-3.094 3.29-3.094zm0 1.512c-.882 0-1.512.588-1.512 1.582 0 .994.63 1.582 1.512 1.582s1.512-.588 1.512-1.582c0-.994-.63-1.582-1.512-1.582zm-.938-5.432h1.862v2.268h-1.862v-2.268zm19.011-.21h1.876v12.964h-1.876V32.282zm-3.822 1.344h1.848c0 3.962-1.344 7.21-5.95 9.436l-.966-1.484c3.724-1.792 5.068-4.144 5.068-7.616v-.336zm-4.382 0h5.264v1.47h-5.264v-1.47z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

JoinBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

function WriteBtn(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20z" fill="#144182" />
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={8}
        y={8}
        width={24}
        height={24}
      >
        <Path fill="#D9D9D9" d="M8 8H32V32H8z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M13 27h1.425l9.775-9.775-1.425-1.425L13 25.575V27zm-2 2v-4.25l13.2-13.175c.2-.183.42-.325.663-.425.241-.1.495-.15.762-.15s.525.05.775.15c.25.1.467.25.65.45l1.375 1.4c.2.183.346.4.438.65a2.165 2.165 0 010 1.512 1.874 1.874 0 01-.438.663L15.25 29H11zm12.475-12.475l-.7-.725 1.425 1.425-.725-.7z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

function RegisterBtn(props) {
  const { backColor, fontColor } = props;

  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_658_154)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="#144182" />
      </G>
      <Path
        d="M156.574 38.204h11.732v1.512h-11.732v-1.512zm1.414-2.366h8.988v1.47h-8.988v-1.47zm0-3.206h8.918v1.484h-7.07v2.45h-1.848v-3.934zm4.41 7.854c2.8 0 4.494.854 4.494 2.38 0 1.526-1.694 2.38-4.494 2.38s-4.508-.854-4.508-2.38c0-1.526 1.708-2.38 4.508-2.38zm0 1.4c-1.736 0-2.618.322-2.618.98 0 .672.882.966 2.618.966 1.736 0 2.618-.294 2.618-.966 0-.658-.882-.98-2.618-.98zm7.041-2.66h11.746v1.484h-11.746v-1.484zm1.442-6.692h8.876v3.514h-7.014v1.4h-1.848v-2.716h7.028v-.784h-7.042v-1.414zm.014 4.354h9.114v1.414h-9.114v-1.414zm3.486.686h1.862v2.464h-1.862v-2.464zm-3.64 3.864h9.1v3.766h-1.862v-2.296h-7.238v-1.47zm19.893-9.156h1.848v12.964h-1.848V32.282zm1.428 5.054h2.296v1.554h-2.296v-1.554zm-9.8-3.136h7.546v1.484h-7.546V34.2zm3.794 2.212c1.89 0 3.29 1.288 3.29 3.094 0 1.806-1.4 3.094-3.29 3.094-1.89 0-3.29-1.288-3.29-3.094 0-1.806 1.4-3.094 3.29-3.094zm0 1.512c-.882 0-1.512.588-1.512 1.582 0 .994.63 1.582 1.512 1.582s1.512-.588 1.512-1.582c0-.994-.63-1.582-1.512-1.582zm-.938-5.432h1.862v2.268h-1.862v-2.268zm19.011-.21h1.876v12.964h-1.876V32.282zm-3.822 1.344h1.848c0 3.962-1.344 7.21-5.95 9.436l-.966-1.484c3.724-1.792 5.068-4.144 5.068-7.616v-.336zm-4.382 0h5.264v1.47h-5.264v-1.47z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

RegisterBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

function ChangeBtn(props) {
  const { backColor, fontColor } = props;
  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_90_106)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="#144182" />
      </G>
      <Path
        d="M162.916 34.452h3.304v1.47h-3.304v-1.47zm0 2.786h3.36v1.47h-3.36v-1.47zm2.632-4.942h1.862v9.562h-1.862v-9.562zm-6.72 11.242h8.862v1.484h-8.862v-1.484zm0-2.618h1.876v3.472h-1.876V40.92zm-1.722-7.784h1.848v1.974h2.464v-1.974h1.82v6.692h-6.132v-6.692zm1.848 3.388v1.834h2.464v-1.834h-2.464zm16.729-2.198h3.038v1.484h-3.038v-1.484zm-.098 2.688h3.038v1.484h-3.038v-1.484zm2.842-4.732h1.862v7.462h-1.862v-7.462zm-4.228.882h1.988c0 3.528-1.988 5.796-5.922 6.874l-.728-1.47c3.29-.854 4.662-2.478 4.662-4.508v-.896zm-3.948 0h5.25v1.484h-5.25v-1.484zm5.74 6.748c2.632 0 4.382 1.008 4.382 2.632s-1.75 2.646-4.382 2.646c-2.632 0-4.382-1.022-4.382-2.646 0-1.624 1.75-2.632 4.382-2.632zm0 1.428c-1.582 0-2.534.406-2.534 1.204 0 .798.952 1.19 2.534 1.19 1.596 0 2.548-.392 2.548-1.19 0-.798-.952-1.204-2.548-1.204zm14.643-9.058h1.848v12.964h-1.848V32.282zm1.428 5.054h2.296v1.554h-2.296v-1.554zm-9.8-3.136h7.546v1.484h-7.546V34.2zm3.794 2.212c1.89 0 3.29 1.288 3.29 3.094 0 1.806-1.4 3.094-3.29 3.094-1.89 0-3.29-1.288-3.29-3.094 0-1.806 1.4-3.094 3.29-3.094zm0 1.512c-.882 0-1.512.588-1.512 1.582 0 .994.63 1.582 1.512 1.582s1.512-.588 1.512-1.582c0-.994-.63-1.582-1.512-1.582zm-.938-5.432h1.862v2.268h-1.862v-2.268zm19.011-.21h1.876v12.964h-1.876V32.282zm-3.822 1.344h1.848c0 3.962-1.344 7.21-5.95 9.436l-.966-1.484c3.724-1.792 5.068-4.144 5.068-7.616v-.336zm-4.382 0h5.264v1.47h-5.264v-1.47z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

ChangeBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

function DeleteBtn(props) {
  const { backColor, fontColor } = props;
  return (
    <Svg width={362} height={87} viewBox="0 0 362 87" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_90_239)">
        <Rect x={20} y={13} width={322} height={47} rx={10} fill={backColor} />
        <Rect x={20.5} y={13.5} width={321} height={46} rx={9.5} stroke="#144182" />
      </G>
      <Path
        d="M159.85 40.164h1.862v2.1h-1.862v-2.1zm5.67-7.882h1.862v12.964h-1.862V32.282zm-8.666 10.808l-.224-1.498c2.352-.014 5.488-.014 8.218-.378l.126 1.344c-2.814.518-5.824.532-8.12.532zm.028-9.38h7.798v1.456h-7.798V33.71zm3.892 1.974c1.918 0 3.248.98 3.248 2.422 0 1.456-1.33 2.436-3.248 2.436-1.89 0-3.22-.98-3.22-2.436 0-1.442 1.33-2.422 3.22-2.422zm0 1.4c-.84 0-1.442.364-1.442 1.022 0 .672.602 1.036 1.442 1.036.868 0 1.47-.364 1.47-1.036 0-.658-.602-1.022-1.47-1.022zm-.924-4.746h1.862v2.212h-1.862v-2.212zm12.963 6.594h1.862v2.842h-1.862v-2.842zm5.684-6.65h1.862v9.814h-1.862v-9.814zm-7.476 11.256h9.618v1.484h-9.618v-1.484zm0-2.366h1.862v2.758h-1.862v-2.758zm-1.4-1.68l-.224-1.484c2.366 0 5.53-.028 8.246-.378l.112 1.33c-2.758.462-5.796.532-8.134.532zm6.426.322h2.856v1.274h-2.856v-1.274zm-2.478-7.084c1.89 0 3.22.938 3.22 2.31 0 1.386-1.33 2.31-3.22 2.31-1.904 0-3.234-.924-3.234-2.31 0-1.372 1.33-2.31 3.234-2.31zm0 1.358c-.868 0-1.47.322-1.47.952 0 .63.602.952 1.47.952.854 0 1.456-.322 1.456-.952 0-.63-.602-.952-1.456-.952zm9.225 3.206h1.078c2.604 0 4.046-.028 5.782-.294l.154 1.442c-1.75.266-3.29.294-5.936.294h-1.078v-1.442zm0-4.494h6.09v1.442h-4.228v3.934h-1.862V32.8zm1.288 2.24h4.522v1.386h-4.522V35.04zm6.58-2.758h1.862v6.65h-1.862v-6.65zm1.106 2.534h2.464v1.498h-2.464v-1.498zm-7.812 4.662h8.568v3.458h-6.692v1.554h-1.848v-2.87h6.706v-.728h-6.734v-1.414zm.028 4.27h8.918v1.414h-8.918v-1.414zm14.531-4.55h1.862v2.534h-1.862v-2.534zm-2.366-.98h6.734v1.47h-6.734v-1.47zm0-4.872h6.706v1.47h-4.844v3.948h-1.862v-5.418zm1.344 2.45h5.11v1.428h-5.11v-1.428zm6.664-3.528h1.862v13.006h-1.862V32.268zm-8.68 10.654l-.224-1.512c2.268 0 5.46-.028 8.19-.434l.14 1.358c-2.814.56-5.866.574-8.106.588z"
        fill={fontColor}
      />
      <Defs></Defs>
    </Svg>
  );
}

DeleteBtn.propTypes = {
  backColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};

export { LoginBtn, FinishBtn, GetReAuthCodeBtn, JoinBtn, WriteBtn, RegisterBtn, ChangeBtn, DeleteBtn };
