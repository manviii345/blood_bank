const fs = require('fs');

let html = fs.readFileSync('heart.html', 'utf8');

// React attribute conversions
html = html.replace(/class=/g, 'className=')
           .replace(/stroke-width=/g, 'strokeWidth=')
           .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
           .replace(/stroke-dasharray=/g, 'strokeDasharray=')
           .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
           .replace(/fill-opacity=/g, 'fillOpacity=')
           .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
           .replace(/color-interpolation-filters=/g, 'colorInterpolationFilters=')
           .replace(/xml:space=/g, 'xmlSpace=')
           .replace(/style="[^"]*"/g, ''); // Remove inline styles that might break JSX

const jsx = `import './HeartAnimation.css';

export function HeartAnimation() {
  return (
    <div className="heart-wrapper">
      ${html}
    </div>
  );
}`;

fs.writeFileSync('src/components/ui/HeartAnimation.jsx', jsx);

let css = fs.readFileSync('heart.css', 'utf8');
css = css.replace(/body\s*\{/g, '.heart-wrapper {')
         .replace(/section\s*\{/g, '.heart-section {')
         .replace(/svg\s*\{/g, '.heart-wrapper svg {');

fs.writeFileSync('src/components/ui/HeartAnimation.css', css);
console.log('Successfully converted');
