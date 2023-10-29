import { theme } from './theme';

export default function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        body {
          font-family: ${theme.typography.fontFamily}, sans-serif !important;
          color: ${theme.colors.neutral[900]}
        }
        input, button {
          font-family: ${theme.typography.fontFamily}, sans-serif !important;
        }
        input[type="checkbox"],
        input[type="radio"] {
          background-repeat: 'none';
          background-position: center;
          cursor: pointer;
        }
        input[type="checkbox"]:checked {
          background-image: url('/images/check.svg');
          background-size: 24px;
          background-position: center;
        }
        input[type="radio"]:checked {
          background-image: radial-gradient(${theme.colors.primary[900]},${theme.colors.primary[900]} 47%,white 47%)
        }
        img, video {
          max-width: 100%;
          height: auto;
        }
        audio, canvas, embed, iframe, img, object, svg, video {
          display: block;
          vertical-align: middle;
        }
        p {
          margin-bottom: 12px;
          line-height: 130%;
        }
        ol {
          padding-left: 26px;
        }
        li {
          padding-bottom: 8px;
        }
        h1 {
          font-size: 28px;
        }
        h2 {
          font-size: 24px;
        }
        h3 {
          font-size: 20px;
        }
        h4 {
          font-size: 18px;
        }
        h5 {
          font-size: 16px;
        }
        strong {
          font-weight: 500;
          color: ${theme.colors.neutral[800]}
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }
        /* ================== */
        /* NextJS */
        /* ================== */
        html {
          height: 100%;
        }
        body,
        #__next {
          height: 100%;
        }
        #__next {
          display: flex;
        }
        #__next > * {
          flex: 1;
          display: flex;
        }
      `}</style>
    )
}