# Avara
Shopify 2.0 theme using node, Vite, Tailwind, Prestige, and custom components

## Tailwind / Vite Shopify CLI Theme
This is a custom Shopify 2.0 theme using [Prestige 9.1.0](https://themes.shopify.com/themes/prestige/styles/allure#ReleaseNotes), [Tailwind CSS](https://tailwindcss.com/) & [Vite](https://vitejs.dev/).

## Requirements
- [Shopify CLI for themes](https://shopify.dev/themes/tools/cli/getting-started)
- A Shopify Theme with products and collections

## Git Flow
We use a Git Flow branching model, where the repository holds two main branches with an infinite lifetime:

main reflects the latest release to production, i.e. the current version of the live theme.
develop collects all completed developments for the next release and is set as the default branch.

### Branching System
No work is committed and pushed directly to `main`, which is updated only as part of a release.
Only small maintenance work, including release preparation, can be done directly in `develop`. Meaningful pieces should be developed in a dedicated `feature` branch created from `develop` and associated to a Notion Task.

By convention, the branch name is of the form `feature/<ID>-short-lowercase-title`. This also applies to bug-fixes, where a separate naming like `fix/<ID>-short-lowercase-title` should be used. Note however that hot-fixes are treated differently.

Once completed, the branch is merged back into develop via a pull request. The pull request should be set as a draft until it passes a successful build using github actions. Once passed open the request and set it as ready to review.

Each significant development must be mentioned as a bullet point in the description of your pull request before being pushed to or merged into develop, to serve as a change log for the next release.

### Hot Fix Procedure
Hot-fixes that need to be brought in asap, independently of any other pending development, are carried out in a dedicated branch in the form `hotfix/<ID>-short-lowercase-title` created from main. The branch is merged directly back to main as a new patch release, and must be also merged into develop (or possibly an open release branch).

### Release Procedure
Releases are only used after a theme is live. There is no need to follow this procedure if the theme is still in development. The first publication of the theme will start with version 1.0.0.
Releases should only happen from a stable develop, possibly creating a release branch for the release preparation, with a name of the form `release/v<next-release-version>`, e.g. `release/v1.1.0` for a new minor release.

Release preparation
Decide on the next version based on whether it is a patch, minor, major release
For patch changes: 1.0.0 -> 1.0.1 (mainly for hot-fixes)
For minor changes: 1.0.0 -> 1.1.0 (e.g. any change that affects frontend pages, minor theme refinements or additions, general maintenance)
For major changes: 1.0.0 -> 2.0.0 (e.g a new page or section)
(Note: for the remaining steps, a minor release with 1.1.0 will be used as an example)

Commit and push all changes with the comment: 1.1.0 release preps.

1.1.0 release preps Go on GitHub and create a new pull request from the release branch to master - Write title in the form "1.1.0 release" - Paste as comment the list of changes  - Assign reviewer(s) As part of the review process, make sure the theme can be built and run locally - Once the pull request is merged into master, create a new release on GitHub (Code > releases > Draft new release) - Tag version: v1.1.0 - Title: SmaRP 1.1.0 - Body: Paste as comment the list of changes - Click on "Publish release". If the release was done from a release branch and changes were made to that branch to prepare the branch for realease, a pull request should be created to merge those changes back into develop similar to a feature branch. Commit and push.

## Theme Building and Deployment
### Github Actions
Github actions will be leveraged in 3 ways to create and update themes.

#### Deployment to production
When code is merged into main a deployment action will run. This action will run the following jobs:

1. Install all dependancies
```sh
npm i 
```
2. Pull changes that were made to theme via theme editor.
```sh
shopify theme pull -o templates/*.json locales/*.json sections/*.json config/*.json
```
3. Build files into production ready theme.
```sh
npm run build
```
4. Push theme files to live shopify theme.
```sh
shopify theme push -a --theme theme name or theme id
```

#### Deployment to QA
1. Install all dependancies
```sh
npm i 
```
2. Pull changes that were made to live theme via theme editor.
```sh
shopify theme pull -l
```
3. Build files into production ready theme.
```sh
npm run build
```
4. Push theme files to non-live shopify theme.
```sh
shopify theme push --theme theme name or theme id
```

#### Pull Request Tests and Builds
When a pull request is created it should be placed as a draft request initially.
When a draft Pull request is created the following action script is run:
1. Install all dependancies
```sh
npm i 
```
3. Build files into production ready theme.
```sh
npm run build
```
If the build passes and has no errors open the pull request and set it as ready to review
Once the pull request is open and waiting for review the following action script is run:
1. Install all dependancies
```sh
npm i 
```
3. Build files into production ready theme.
```sh
npm run build
```
4. Push theme files to a new theme with the name of the branch used to trigger this action.
```sh
shopify theme push -u --theme {{ GITHUB_REF_NAME }}
```

This new theme will be an isolated version of your code before merged into develop. This theme is used for QA and regression testing before merging.



## Getting Started
To get started with development on this theme (use this particular repo as a template for your site build, please)

1. Clone the repo onto your local machine using SSH.
2. Make sure that you are on the develop branch.
3. Install dependencies using [npm](https://www.npmjs.com/)
```sh
npm i
```
4. Run your dev server:
```sh
npm run dev
```

this command runs 2 npm commands simultainiously:
```sh
dev:shopify: shopify theme dev --store $npm_package_config_store,
dev:vite: vite,
```
vite watches for changes in the frontend folder building & updating nesseccary files while theme dev watches for changes in base theme files.

## File Structure
### Repository Structure
Since this project uses vite to compile JS and CSS into asset files all js or css files are to be created in the `frontend` folder.
The `frontend` folder should be used for other assets within the theme such as fonts, images etc.
All filles within a nested folder should be imported into the `index` file of that folder.
When a build is run for the theme. All files in the fronted are compiled into files in the `assets` folder and referenced in the `vite.liquid` snippet which is rendered in `theme.liquid`

### Sections & Snippets
Sections naming convention should use the Prestige theme prefix schema:
`[main, header, footer, product, collection, blog, cart]` - `section or snippet name`

- `snippets/css-variables.liquid` controls typography classes sitewide. This should be modified with caution. These classes or Tailwind classes should be used where appropriate, rather than creating one-off regular CSS classes.
- `snippets/button.liquid` controls button and link classes sitewide.
- unique JSON templates should be created for new pages, unless those pages use only page content from Online Store > Pages
- Take care when modifying existing sections and snippets that new modifications do not affect existing uses of those sections/snippets. It's perfectly acceptable to duplicate an existing section/snippet to create a new one.

## Whitespace control
In [Liquid](https://shopify.github.io/liquid/basics/whitespace/), include a hyphen in your tag syntax `{{-`, `-}}`, `{%-`, and `-%}` to strip whitespace from the left or right side of a rendered tag.
By including hyphens in your `assign` tag, you can strip the generated whitespace from the rendered template.
If you don’t want any of your tags to print whitespace, as a general rule you can add hyphens to both sides of all your tags (`{%-` and `-%}`):
```liquid
{%- assign username = "Borat Margaret Sagdiyev" -%}
{%- if username and username.size > 10 -%}
  Wow, {{ username }}, I like!
{%- else -%}
  Hello there!
{%- endif -%}
```

## Frameworks
### Tailwind CSS
This project uses [TailwindCSS](https://tailwindcss.com/) `v3` a mobile first utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. Check out the amazing [documentation](https://tailwindcss.com/docs) and start adding classes to your elements.

#### Headwind & Tailwind CSS IntelliSense
Check out [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) VSCode extension for TailwindCSS classes. Headwind is an opinionated Tailwind CSS class sorter for Visual Studio Code. It enforces consistent ordering of classes by parsing your code and reprinting class tags to follow a given order.

Optionally you can also install and use [TailwindCSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense). Tailwind CSS IntelliSense enhances the Tailwind development experience by providing Visual Studio Code users with advanced features such as autocomplete, syntax highlighting, and linting.

### Splide.js
This project uses [Splide.js](https://splidejs.com/) for Sliders.
