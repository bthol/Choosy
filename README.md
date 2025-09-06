# Choosy

**Developer**: Blake Thollaug

**Stack**: TypeScript, Sass, HTML, CSS, JavaScript, Node

**Description**: Choosy is a simple website for option selection. Need to choose? Choose Choosy!

## Website Architecture
The Choosy website architecture is broadly broken into two fundamental parts: 1) source code and 2) build code. The separation of source code from build code permits the conveniences of development dependecies such as Typescript--for script type safety--and Sass--for manageable stylesheets--which improve the developement process for website code without the performance and compatability downsides of deploying code with excessive dependencies. As such, Choosy is a more scalable project than it would be otherwise, despite its simplicity. Beyond their separation, the source and build parts have file structures that are identical to one another, save for a difference in their root directory names and the non-compilable files in the source directory, so that compilations are easily tracable from a file in the source structure to a file in the build structure. This approach to file structure organization, while not stricly necessary, can greatly simplify the process of setting up and managing of compilation paths and diagnosing compilation errors.

## Developer Reference

**CLI commands**
 - initialize typescript:               `$npx tsc --init`
 - run typescript compiler:             `$npx tsc`
 - automatic typescript compiler:       `$npx tsc --watch`
 - compile sass to css:                 `$npm run compile-sass`
 - automatic sass to css compilation:   `$npm run watch-sass`