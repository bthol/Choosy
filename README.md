# Choosy

**Developer**: Blake Thollaug

**Stack**: TypeScript, Sass, HTML, CSS, JavaScript, Node

**Description**: Choosy is a simple website for option selection. Need to choose? Choose Choosy!

## UI/UX
Choosy has an exceptionally robust and simply stylish interface that adapts to a wide range of viewports with ease and clarity. Its red lined navigation bar and yellow backdrop boldly distinguish it as being equal parts intense and playful. Colors are carefully fine-tuned to maximize text contrast and fit the overachring theme and shape corners are broken just enough to focus on the content contained therein. An elegant layout scheme accomodates both a center and left content justification by keeping things simple and intuitively organized.

## Website Architecture
The Choosy website architecture is broadly broken into two fundamental directories: 1) source code and 2) build code. The separation of source code from build code permits the conveniences of development dependecies such as Typescript--for script type safety--and Sass--for manageable stylesheets--which improve the developement process without the performance and compatability downsides of deploying code with excessive dependencies. As such, Choosy is a more scalable project than it would be otherwise, despite its simplicity not requiring scalability at this stage of its development life cycle.

## Developer Reference

**CLI commands**
 - initialize typescript:               `$npx tsc --init`
 - run typescript compiler:             `$npx tsc`
 - automatic typescript compiler:       `$npx tsc --watch`
 - compile sass to css:                 `$npm run compile-sass`
 - automatic sass to css compilation:   `$npm run watch-sass`

**Font Awesome Icon size classes**
fa-2xs, fa-xs, fa-sm, fa-lg, fa-xl, fa-2xl
 