# Tailwind / Vite Shopify CLI Theme
Shopify 2.0 theme using node, Vite, Tailwind, Prestige, and custom components

This is a custom Shopify 2.0 theme using [Prestige 9.1.0](https://themes.shopify.com/themes/prestige/styles/allure#ReleaseNotes), [Tailwind CSS](https://tailwindcss.com/) & [Vite](https://vitejs.dev/).

## Requirements
- [Shopify CLI for themes](https://shopify.dev/themes/tools/cli/getting-started)
- A Shopify Theme with products and collections

## Git
We use a Git branching model, where the repository holds two main branches with an infinite lifetime:

`main` reflects the latest stable production release, and is used only to protect stable iterations of the codebase from issues that may arise in `develop` or production.  We don't deploy from `main`, we really only use this branch as a backup for `develop`, to make it easier to test or roll-back if something goes wrong.

`develop` reflects the current state of the live site or primary development theme, collects all completed developments for the next stable release, and is set as the default branch to which pull requests should be made.

### Branching System
No work is committed and pushed directly to `main`, which is updated only as part of a stable release.
Only small maintenance work, including release preparation, can be done directly in `develop`. All work should be developed in a dedicated `feature` branch created from `develop`, in alignment with a Notion task.

Branch names should be structured like `feature/<ID>-short-lowercase-title`, where the ID is the developer's initials. This also applies to bug-fixes, where `fix/<ID>-short-lowercase-title` should be used.

Once completed, the branch is merged back into `develop` via a pull request. The pull request should be set as a draft until it passes a successful build using github actions. Once passed open the request and set it as ready to review.

Each significant development must be mentioned as a bullet point in the description of your pull request before being pushed to or merged into develop, to serve as a change log for the next release.


## Theme Building and Deployment
### Github Actions
Github actions will be leveraged to create and update themes.

#### Deployment to develop
1. Install all dependancies
```sh
npm i 
```
2. Build files into production ready theme.
```sh
npm run build
```
3. Push theme files to non-live development shopify theme.
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

To pull Theme Editor changes from your dev theme into your branch, run the following in your terminal immediately after stopping the `npm run dev` command, before committing your code:
```sh
shopify theme pull -o templates/*.json locales/*.json settings_schema.json settings_data.json header-group.json footer-group.json overlay-group.json
```

## File Structure
### Repository Structure
Since this project uses vite to compile JS and CSS into asset files, all js or css files should be created in the `frontend` folder.  The `frontend` folder also contains fonts.

The `frontend` folder should not be used for other assets within the theme such as images, etc.

All files within a nested folder should be imported into the `index` file of that folder.
When a build is run for the theme, all files in `fronted` are compiled into files in the `assets` folder and referenced in the `vite.liquid` snippet which is rendered in `theme.liquid`

### Sections & Snippets
Naming convention for sections should use the Prestige theme prefix schema:
`[main, header, footer, product, collection, blog, cart]` - `section or snippet name`

- When duplicating a page section or snippet because the work calls for making a new instance, use the original name with a qualifier appended whenever possible, to keep similar sections together in the file list.  For instance, a duplication of `timeline.liquid` should be named `timeline-special.liquid`

- When creating metafields or metaobjects, always use the namespace `driver` and a short, descriptive key - e.g. `product.metafields.driver.filter_color`.  All metafields/objects should have a description in Shopify that clearly explains their purpose and use, e.g. "Color filter for collections"

- `snippets/css-variables.liquid` controls typography classes sitewide. This should be modified with caution. These classes or Tailwind classes should be used where appropriate, rather than creating one-off regular CSS classes.

- `snippets/button.liquid` controls button and link classes sitewide.

- unique JSON templates should be created for new pages, unless those pages use the default page template with no modifications

- Take care when modifying existing sections and snippets that new modifications do not affect existing uses of those sections/snippets. It's perfectly acceptable to duplicate an existing section/snippet to create a new one.

## Frameworks
### Tailwind CSS
This project uses [TailwindCSS](https://tailwindcss.com/) `v3` a mobile first utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. Check out the amazing [documentation](https://tailwindcss.com/docs) and start adding classes to your elements.

#### Headwind & Tailwind CSS IntelliSense
Check out [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) VSCode extension for TailwindCSS classes. Headwind is an opinionated Tailwind CSS class sorter for Visual Studio Code. It enforces consistent ordering of classes by parsing your code and reprinting class tags to follow a given order.

Also install and use [TailwindCSS IntelliSense](https://github.com/tailwindlabs/tailwindcss-intellisense). Tailwind CSS IntelliSense enhances the Tailwind development experience by providing Visual Studio Code users with advanced features such as autocomplete, syntax highlighting, and linting.

### Splide.js
This project uses [Splide.js](https://splidejs.com/) for Sliders.

### Shadow DOM
Prestige makes great use of the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) for reusable components.  Working with these elements requires correct CSS targeting and understanding of javascript.  Learn more in Prestige's [technical documentation](https://support.maestrooo.com/category/300-technical-documentation) 

### Whitespace control
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
