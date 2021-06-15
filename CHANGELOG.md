# Changelog

## [Unreleased](https://github.com/stimulusreflex/stimulus_reflex/tree/HEAD)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.5.0.pre1...HEAD)

**Closed issues:**

- HAML code with form tag connect controller twice [\#520](https://github.com/stimulusreflex/stimulus_reflex/issues/520)
- Web Components Breaking In Stimulus Reflex Morph [\#511](https://github.com/stimulusreflex/stimulus_reflex/issues/511)

## [v3.5.0.pre1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.5.0.pre1) (2021-06-02)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.5.0.pre0...v3.5.0.pre1)

**Fixed bugs:**

- handle operations that have string-defined selector argument [\#509](https://github.com/stimulusreflex/stimulus_reflex/pull/509) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- How to \(better\) use Stimulus Reflex with Cypress? [\#512](https://github.com/stimulusreflex/stimulus_reflex/issues/512)

**Merged pull requests:**

- Update reflexes.js [\#515](https://github.com/stimulusreflex/stimulus_reflex/pull/515) ([julianrubisch](https://github.com/julianrubisch))
- Fix cross-tab errors for piggybacked operations [\#514](https://github.com/stimulusreflex/stimulus_reflex/pull/514) ([julianrubisch](https://github.com/julianrubisch))
- Bump ws from 7.4.5 to 7.4.6 [\#513](https://github.com/stimulusreflex/stimulus_reflex/pull/513) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v3.5.0.pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.5.0.pre0) (2021-05-21)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.1...v3.5.0.pre0)

**Breaking changes:**

- isolation mode should be enabled by default [\#423](https://github.com/stimulusreflex/stimulus_reflex/issues/423)
- form serialization should be optional [\#422](https://github.com/stimulusreflex/stimulus_reflex/issues/422)

**Implemented enhancements:**

- tab\_id accessor [\#506](https://github.com/stimulusreflex/stimulus_reflex/pull/506) ([leastbad](https://github.com/leastbad))
- Stop adding whitespace when parsing our html [\#492](https://github.com/stimulusreflex/stimulus_reflex/pull/492) ([lmatiolis](https://github.com/lmatiolis))
- Log the full exception trace [\#491](https://github.com/stimulusreflex/stimulus_reflex/pull/491) ([rmckayfleming](https://github.com/rmckayfleming))
- delegate dom\_id to CableReady::Identifiable [\#485](https://github.com/stimulusreflex/stimulus_reflex/pull/485) ([leastbad](https://github.com/leastbad))
- report failed basic auth [\#454](https://github.com/stimulusreflex/stimulus_reflex/pull/454) ([leastbad](https://github.com/leastbad))
- deprecation warnings \(consumer, form serialization, isolation mode\) [\#438](https://github.com/stimulusreflex/stimulus_reflex/pull/438) ([leastbad](https://github.com/leastbad))
- implicit dom\_id for morph selectors [\#436](https://github.com/stimulusreflex/stimulus_reflex/pull/436) ([leastbad](https://github.com/leastbad))
- version check [\#434](https://github.com/stimulusreflex/stimulus_reflex/pull/434) ([leastbad](https://github.com/leastbad))

**Fixed bugs:**

- Nokogiri usage to process HTML adds whitespace nodes, causing unneeded morphdom updates [\#487](https://github.com/stimulusreflex/stimulus_reflex/issues/487)
- reflexData missing on element in beforeReflex [\#443](https://github.com/stimulusreflex/stimulus_reflex/issues/443)
- cable\_ready method in Reflex class should support custom operations [\#419](https://github.com/stimulusreflex/stimulus_reflex/issues/419)
- convert symbol keys, ensure fragment html exists [\#503](https://github.com/stimulusreflex/stimulus_reflex/pull/503) ([leastbad](https://github.com/leastbad))
- only run piggybacked operations after SR is finished, and isolate them [\#482](https://github.com/stimulusreflex/stimulus_reflex/pull/482) ([leastbad](https://github.com/leastbad))
- refactor declarative reflex observer [\#440](https://github.com/stimulusreflex/stimulus_reflex/pull/440) ([leastbad](https://github.com/leastbad))

**Deprecated:**

- data-reflex-dataset and data-reflex-dataset-all [\#478](https://github.com/stimulusreflex/stimulus_reflex/pull/478) ([leastbad](https://github.com/leastbad))

**Removed:**

- refactor stimulus\_reflex.js [\#444](https://github.com/stimulusreflex/stimulus_reflex/pull/444) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- Logging issue when using Morphing Multiplicity with Symbol keys [\#502](https://github.com/stimulusreflex/stimulus_reflex/issues/502)
- Re-assignment of constant `reflexRoot` [\#473](https://github.com/stimulusreflex/stimulus_reflex/issues/473)
- Lost Instance Variables [\#471](https://github.com/stimulusreflex/stimulus_reflex/issues/471)
- Warn developers about example.com [\#468](https://github.com/stimulusreflex/stimulus_reflex/issues/468)
- "No route matches" in production [\#465](https://github.com/stimulusreflex/stimulus_reflex/issues/465)
- Reflex replaced with a new instance for some reason [\#463](https://github.com/stimulusreflex/stimulus_reflex/issues/463)
- Uncaught exception when morph removes controllerElement [\#459](https://github.com/stimulusreflex/stimulus_reflex/issues/459)
- Link for "read more about why we enable caching here" is broken [\#455](https://github.com/stimulusreflex/stimulus_reflex/issues/455)
- Page morphs fail to refresh \(blank operations hash\) in Safari/Edge on staging [\#453](https://github.com/stimulusreflex/stimulus_reflex/issues/453)
- ActiveRecord queries and associations are cached, leading to non-idempotent Reflexes [\#446](https://github.com/stimulusreflex/stimulus_reflex/issues/446)
- When devise uses `timeoutable` there is a session error authenticating a stimulus web socket. [\#437](https://github.com/stimulusreflex/stimulus_reflex/issues/437)
- SR strips out @click attribute from elements passed to selector morph [\#435](https://github.com/stimulusreflex/stimulus_reflex/issues/435)
- SR+CR version checks on startup in development [\#433](https://github.com/stimulusreflex/stimulus_reflex/issues/433)
- Installer can insert session\_store config in wrong place [\#429](https://github.com/stimulusreflex/stimulus_reflex/issues/429)

**Merged pull requests:**

- Bump nokogiri from 1.11.3 to 1.11.4 [\#507](https://github.com/stimulusreflex/stimulus_reflex/pull/507) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump lodash from 4.17.20 to 4.17.21 [\#504](https://github.com/stimulusreflex/stimulus_reflex/pull/504) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump handlebars from 4.7.6 to 4.7.7 [\#501](https://github.com/stimulusreflex/stimulus_reflex/pull/501) ([dependabot[bot]](https://github.com/apps/dependabot))
- Move object\_with\_indifferent\_access to ReflexData [\#500](https://github.com/stimulusreflex/stimulus_reflex/pull/500) ([erlingur](https://github.com/erlingur))
- Bump actionpack from 6.1.3 to 6.1.3.2 [\#499](https://github.com/stimulusreflex/stimulus_reflex/pull/499) ([dependabot[bot]](https://github.com/apps/dependabot))
- render\_collection [\#498](https://github.com/stimulusreflex/stimulus_reflex/pull/498) ([leastbad](https://github.com/leastbad))
- Bump rexml from 3.2.4 to 3.2.5 [\#495](https://github.com/stimulusreflex/stimulus_reflex/pull/495) ([dependabot[bot]](https://github.com/apps/dependabot))
- Prevent install script from choking on magic comments via hard-coded line numbers [\#494](https://github.com/stimulusreflex/stimulus_reflex/pull/494) ([leastbad](https://github.com/leastbad))
- Always pick up instance variables when accessing controller [\#493](https://github.com/stimulusreflex/stimulus_reflex/pull/493) ([leastbad](https://github.com/leastbad))
- Fix broken link in docs [\#488](https://github.com/stimulusreflex/stimulus_reflex/pull/488) ([asmega](https://github.com/asmega))
- Factor reflex creation and reflex data management out of channel [\#486](https://github.com/stimulusreflex/stimulus_reflex/pull/486) ([julianrubisch](https://github.com/julianrubisch))
- prevent /cable from being prepended to ActiveStorage route helpers [\#484](https://github.com/stimulusreflex/stimulus_reflex/pull/484) ([leastbad](https://github.com/leastbad))
- Fix Changelog Action [\#483](https://github.com/stimulusreflex/stimulus_reflex/pull/483) ([marcoroth](https://github.com/marcoroth))
- Reinitialize controller\_class renderer with connection.env [\#481](https://github.com/stimulusreflex/stimulus_reflex/pull/481) ([leastbad](https://github.com/leastbad))
- feature: add check for default url options [\#480](https://github.com/stimulusreflex/stimulus_reflex/pull/480) ([nachiket87](https://github.com/nachiket87))
- Mutation observer wouldn't fire in certain situations [\#479](https://github.com/stimulusreflex/stimulus_reflex/pull/479) ([joshleblanc](https://github.com/joshleblanc))
- Reflex return payloads for events and callbacks [\#477](https://github.com/stimulusreflex/stimulus_reflex/pull/477) ([leastbad](https://github.com/leastbad))
- Log reflex payloads client-side [\#476](https://github.com/stimulusreflex/stimulus_reflex/pull/476) ([julianrubisch](https://github.com/julianrubisch))
- add `useReflex` js function to "support" the composable pattern [\#475](https://github.com/stimulusreflex/stimulus_reflex/pull/475) ([marcoroth](https://github.com/marcoroth))
- fix changelog workflow and optimize triggers [\#474](https://github.com/stimulusreflex/stimulus_reflex/pull/474) ([marcoroth](https://github.com/marcoroth))
- add support for prepend and append reflex callbacks [\#472](https://github.com/stimulusreflex/stimulus_reflex/pull/472) ([marcoroth](https://github.com/marcoroth))
- Callback tests [\#470](https://github.com/stimulusreflex/stimulus_reflex/pull/470) ([marcoroth](https://github.com/marcoroth))
- Remove confusing preposition [\#469](https://github.com/stimulusreflex/stimulus_reflex/pull/469) ([richardun](https://github.com/richardun))
- Reflex Callback Skips [\#466](https://github.com/stimulusreflex/stimulus_reflex/pull/466) ([assuntaw](https://github.com/assuntaw))
- Stimulus reflex  concern [\#464](https://github.com/stimulusreflex/stimulus_reflex/pull/464) ([julianrubisch](https://github.com/julianrubisch))
- Bump activerecord from 6.1.1 to 6.1.3 [\#462](https://github.com/stimulusreflex/stimulus_reflex/pull/462) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump actionpack from 6.1.1 to 6.1.3 [\#461](https://github.com/stimulusreflex/stimulus_reflex/pull/461) ([dependabot[bot]](https://github.com/apps/dependabot))
- Check for presence of controller element in serverMessage [\#460](https://github.com/stimulusreflex/stimulus_reflex/pull/460) ([shubik22](https://github.com/shubik22))
- Returns [\#458](https://github.com/stimulusreflex/stimulus_reflex/pull/458) ([leastbad](https://github.com/leastbad))
- handle generated value for channel\_prefix if app directory contains dots or spaces [\#457](https://github.com/stimulusreflex/stimulus_reflex/pull/457) ([lxxxvi](https://github.com/lxxxvi))
- move logger and sanity\_checker to /utils [\#456](https://github.com/stimulusreflex/stimulus_reflex/pull/456) ([leastbad](https://github.com/leastbad))
- Extract RequestParameters class [\#451](https://github.com/stimulusreflex/stimulus_reflex/pull/451) ([julianrubisch](https://github.com/julianrubisch))
- run changelog action not on every single push to master [\#450](https://github.com/stimulusreflex/stimulus_reflex/pull/450) ([marcoroth](https://github.com/marcoroth))
- Extract method invocation policy [\#448](https://github.com/stimulusreflex/stimulus_reflex/pull/448) ([julianrubisch](https://github.com/julianrubisch))
- remove unnecessary gate [\#439](https://github.com/stimulusreflex/stimulus_reflex/pull/439) ([leastbad](https://github.com/leastbad))

## [v3.4.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.1) (2021-01-26)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0...v3.4.1)

**Implemented enhancements:**

- controller element holds Reflex metadata [\#417](https://github.com/stimulusreflex/stimulus_reflex/pull/417) ([leastbad](https://github.com/leastbad))

**Fixed bugs:**

- life-cycle callbacks return correct element reference [\#431](https://github.com/stimulusreflex/stimulus_reflex/pull/431) ([leastbad](https://github.com/leastbad))
- encode form data for chars like '&' and '=' [\#418](https://github.com/stimulusreflex/stimulus_reflex/pull/418) ([RolandStuder](https://github.com/RolandStuder))
- Bug fix: Updating changelog generator to push to master, not main [\#416](https://github.com/stimulusreflex/stimulus_reflex/pull/416) ([MikeRogers0](https://github.com/MikeRogers0))
- Prefix dom\_id with hash/pound [\#410](https://github.com/stimulusreflex/stimulus_reflex/pull/410) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Form serialisation does not escape input values [\#430](https://github.com/stimulusreflex/stimulus_reflex/issues/430)
- dispatchEvent before morph in reflex actions [\#428](https://github.com/stimulusreflex/stimulus_reflex/issues/428)
- Multiple text inputs with the same name lose value in Reflex [\#425](https://github.com/stimulusreflex/stimulus_reflex/issues/425)
- Lifecycle events not being issued correctly [\#413](https://github.com/stimulusreflex/stimulus_reflex/issues/413)
- If the element no longer exists, try to find it.  [\#412](https://github.com/stimulusreflex/stimulus_reflex/issues/412)

**Merged pull requests:**

- Extract callbacks to module [\#427](https://github.com/stimulusreflex/stimulus_reflex/pull/427) ([julianrubisch](https://github.com/julianrubisch))
- Fixes bug where multiple inputs with the same name lost element value [\#426](https://github.com/stimulusreflex/stimulus_reflex/pull/426) ([jonsgreen](https://github.com/jonsgreen))
- Add general policy for CoC enforcement [\#424](https://github.com/stimulusreflex/stimulus_reflex/pull/424) ([hopsoft](https://github.com/hopsoft))
- Update to work with mutatable CR config [\#421](https://github.com/stimulusreflex/stimulus_reflex/pull/421) ([hopsoft](https://github.com/hopsoft))
- Bump nokogiri from 1.10.10 to 1.11.1 [\#420](https://github.com/stimulusreflex/stimulus_reflex/pull/420) ([dependabot[bot]](https://github.com/apps/dependabot))
- Add matrix strategy to ruby tests [\#415](https://github.com/stimulusreflex/stimulus_reflex/pull/415) ([julianrubisch](https://github.com/julianrubisch))
- fix 'operartion' typo [\#411](https://github.com/stimulusreflex/stimulus_reflex/pull/411) ([marcoroth](https://github.com/marcoroth))

## [v3.4.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0) (2020-12-18)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre9...v3.4.0)

**Closed issues:**

- uninitialized constant StimulusReflex::Channel [\#408](https://github.com/stimulusreflex/stimulus_reflex/issues/408)
- StimulusReflex \(3.4.0.pre9\) was unable to find an element  [\#406](https://github.com/stimulusreflex/stimulus_reflex/issues/406)

## [v3.4.0.pre9](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre9) (2020-12-13)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre8...v3.4.0.pre9)

**Implemented enhancements:**

- Allow StimulusReflex to process Rack middlewares [\#399](https://github.com/stimulusreflex/stimulus_reflex/pull/399) ([marcoroth](https://github.com/marcoroth))
- Support for Stimulus 2 [\#398](https://github.com/stimulusreflex/stimulus_reflex/pull/398) ([marcoroth](https://github.com/marcoroth))

**Fixed bugs:**

- fix up install task [\#401](https://github.com/stimulusreflex/stimulus_reflex/pull/401) ([leastbad](https://github.com/leastbad))
- Fix multiple broadcasts from within the same reflex [\#400](https://github.com/stimulusreflex/stimulus_reflex/pull/400) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Sanity checker will fail if node\_modules folder isn't present [\#402](https://github.com/stimulusreflex/stimulus_reflex/issues/402)
- stimulus\_reflex.js:388 Uncaught TypeError: Cannot read property 'completedOperations' of undefined [\#394](https://github.com/stimulusreflex/stimulus_reflex/issues/394)
- Rendering issue [\#289](https://github.com/stimulusreflex/stimulus_reflex/issues/289)

**Merged pull requests:**

- Add dom\_id to the reflex [\#405](https://github.com/stimulusreflex/stimulus_reflex/pull/405) ([hopsoft](https://github.com/hopsoft))
- Don't run sanity checker in production [\#404](https://github.com/stimulusreflex/stimulus_reflex/pull/404) ([joshleblanc](https://github.com/joshleblanc))
- Check package version from yarn.lock if node\_modules folder is not av… [\#403](https://github.com/stimulusreflex/stimulus_reflex/pull/403) ([RolandStuder](https://github.com/RolandStuder))

## [v3.4.0.pre8](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre8) (2020-12-02)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre7...v3.4.0.pre8)

**Closed issues:**

- DirectUpload URL not set using morphs [\#396](https://github.com/stimulusreflex/stimulus_reflex/issues/396)

**Merged pull requests:**

- Delegate render to controller [\#397](https://github.com/stimulusreflex/stimulus_reflex/pull/397) ([hopsoft](https://github.com/hopsoft))

## [v3.4.0.pre7](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre7) (2020-12-01)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre6...v3.4.0.pre7)

**Closed issues:**

- Multiple reflex submissions can lead to unexpected behaviour.  [\#391](https://github.com/stimulusreflex/stimulus_reflex/issues/391)

**Merged pull requests:**

- Trigger piggy back operations after SR operations [\#395](https://github.com/stimulusreflex/stimulus_reflex/pull/395) ([hopsoft](https://github.com/hopsoft))
- `invokeLifecycleMethod\(\)`: handle undefined `element` parameter [\#393](https://github.com/stimulusreflex/stimulus_reflex/pull/393) ([marcoroth](https://github.com/marcoroth))
- don't warn folks twice [\#392](https://github.com/stimulusreflex/stimulus_reflex/pull/392) ([leastbad](https://github.com/leastbad))

## [v3.4.0.pre6](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre6) (2020-11-29)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre5...v3.4.0.pre6)

**Merged pull requests:**

- Update templates for new stage etc [\#390](https://github.com/stimulusreflex/stimulus_reflex/pull/390) ([leastbad](https://github.com/leastbad))
- reflexError and received refactor [\#389](https://github.com/stimulusreflex/stimulus_reflex/pull/389) ([leastbad](https://github.com/leastbad))
- add jQuery support to SR library events [\#388](https://github.com/stimulusreflex/stimulus_reflex/pull/388) ([leastbad](https://github.com/leastbad))
- dont exit in sanity checker on `stimulus\_reflex:install` [\#387](https://github.com/stimulusreflex/stimulus_reflex/pull/387) ([marcoroth](https://github.com/marcoroth))
- Allow `success` and `after` lifecycle methods on replaced elements [\#386](https://github.com/stimulusreflex/stimulus_reflex/pull/386) ([marcoroth](https://github.com/marcoroth))
- split SR operations from data.operations [\#385](https://github.com/stimulusreflex/stimulus_reflex/pull/385) ([leastbad](https://github.com/leastbad))
- don't show findElement warnings unless debugging [\#384](https://github.com/stimulusreflex/stimulus_reflex/pull/384) ([leastbad](https://github.com/leastbad))
- Setup a proxy object that wraps CableReady::Channels [\#382](https://github.com/stimulusreflex/stimulus_reflex/pull/382) ([hopsoft](https://github.com/hopsoft))
- non-SR cable\_ready operation pass-through [\#381](https://github.com/stimulusreflex/stimulus_reflex/pull/381) ([leastbad](https://github.com/leastbad))

## [v3.4.0.pre5](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre5) (2020-11-25)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre4...v3.4.0.pre5)

**Closed issues:**

- SR doesn't seem to handle redirects / 302s [\#376](https://github.com/stimulusreflex/stimulus_reflex/issues/376)

**Merged pull requests:**

- Move package.json to root of project [\#380](https://github.com/stimulusreflex/stimulus_reflex/pull/380) ([hopsoft](https://github.com/hopsoft))
- make element.reflexController a dictionary [\#379](https://github.com/stimulusreflex/stimulus_reflex/pull/379) ([existentialmutt](https://github.com/existentialmutt))
- fixed bug preventing callbacks for multiple morphs [\#378](https://github.com/stimulusreflex/stimulus_reflex/pull/378) ([leastbad](https://github.com/leastbad))
- Handles to mitigate race conditions when running reflexes in quick succession on the same element [\#377](https://github.com/stimulusreflex/stimulus_reflex/pull/377) ([existentialmutt](https://github.com/existentialmutt))
- Exit with nonzero status code [\#375](https://github.com/stimulusreflex/stimulus_reflex/pull/375) ([julianrubisch](https://github.com/julianrubisch))

## [v3.4.0.pre4](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre4) (2020-11-19)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre3...v3.4.0.pre4)

**Fixed bugs:**

- Fix fatal error in `stimulus\_reflex:install` task with Rails 5.2 [\#371](https://github.com/stimulusreflex/stimulus_reflex/pull/371) ([Matt-Yorkley](https://github.com/Matt-Yorkley))
- fix nothing morphs and error messages [\#368](https://github.com/stimulusreflex/stimulus_reflex/pull/368) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- `stimulus\_reflex:install` fails to complete in Rails 5.2 [\#367](https://github.com/stimulusreflex/stimulus_reflex/issues/367)
- Form data still not captured [\#366](https://github.com/stimulusreflex/stimulus_reflex/issues/366)
- Console exception when reflex does not update a page that didn't trigger the reflex [\#363](https://github.com/stimulusreflex/stimulus_reflex/issues/363)
- Improve server-side logging options [\#264](https://github.com/stimulusreflex/stimulus_reflex/issues/264)

**Merged pull requests:**

- use puts instead of ActionCable.logger to sidestep silenced AC logs [\#373](https://github.com/stimulusreflex/stimulus_reflex/pull/373) ([leastbad](https://github.com/leastbad))
- Improve logged post\_install.js message [\#372](https://github.com/stimulusreflex/stimulus_reflex/pull/372) ([forsbergplustwo](https://github.com/forsbergplustwo))
- Pass additional reflex-related data to reflex from data [\#370](https://github.com/stimulusreflex/stimulus_reflex/pull/370) ([joshleblanc](https://github.com/joshleblanc))
- fix: rip out microbundle [\#369](https://github.com/stimulusreflex/stimulus_reflex/pull/369) ([ParamagicDev](https://github.com/ParamagicDev))
- Add tests for broadcasters [\#364](https://github.com/stimulusreflex/stimulus_reflex/pull/364) ([julianrubisch](https://github.com/julianrubisch))
- Do not run sanity check on `rails generate stimulus\_reflex:config` [\#362](https://github.com/stimulusreflex/stimulus_reflex/pull/362) ([RolandStuder](https://github.com/RolandStuder))
- fix: revert CR and @rails/actioncable to dependencies [\#361](https://github.com/stimulusreflex/stimulus_reflex/pull/361) ([ParamagicDev](https://github.com/ParamagicDev))
- xpath fix [\#360](https://github.com/stimulusreflex/stimulus_reflex/pull/360) ([leastbad](https://github.com/leastbad))

## [v3.4.0.pre3](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre3) (2020-11-11)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre2...v3.4.0.pre3)

**Merged pull requests:**

- Allow to supress warnings for sanity checks [\#359](https://github.com/stimulusreflex/stimulus_reflex/pull/359) ([RolandStuder](https://github.com/RolandStuder))
- serializeForm: only append given input if element is submit button [\#357](https://github.com/stimulusreflex/stimulus_reflex/pull/357) ([marcoroth](https://github.com/marcoroth))
- Update package.json to 3.4.0-pre2 [\#356](https://github.com/stimulusreflex/stimulus_reflex/pull/356) ([marcoroth](https://github.com/marcoroth))
- Fix elementToXPath import [\#355](https://github.com/stimulusreflex/stimulus_reflex/pull/355) ([julianrubisch](https://github.com/julianrubisch))
- Add guard clause to return valid empty form data [\#354](https://github.com/stimulusreflex/stimulus_reflex/pull/354) ([julianrubisch](https://github.com/julianrubisch))
- simplify xpath functions [\#353](https://github.com/stimulusreflex/stimulus_reflex/pull/353) ([leastbad](https://github.com/leastbad))
- pass reflex id to reflex [\#352](https://github.com/stimulusreflex/stimulus_reflex/pull/352) ([joshleblanc](https://github.com/joshleblanc))

## [v3.4.0.pre2](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre2) (2020-11-06)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre1...v3.4.0.pre2)

**Closed issues:**

- Regression in version 3.4.0-pre1: Cannot find module `cable\_ready` [\#350](https://github.com/stimulusreflex/stimulus_reflex/issues/350)

**Merged pull requests:**

- move `cable\_ready` to development dependencies [\#351](https://github.com/stimulusreflex/stimulus_reflex/pull/351) ([marcoroth](https://github.com/marcoroth))
- Fix serializeForm initialization [\#349](https://github.com/stimulusreflex/stimulus_reflex/pull/349) ([marcoroth](https://github.com/marcoroth))

## [v3.4.0.pre1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre1) (2020-11-03)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.4.0.pre0...v3.4.0.pre1)

## [v3.4.0.pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.4.0.pre0) (2020-11-02)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0...v3.4.0.pre0)

**Implemented enhancements:**

- Move StimulusReflex::Channel to app/ and allow for a configurable parent channel [\#346](https://github.com/stimulusreflex/stimulus_reflex/pull/346) ([leastbad](https://github.com/leastbad))
- tab isolation mode v2 [\#335](https://github.com/stimulusreflex/stimulus_reflex/pull/335) ([leastbad](https://github.com/leastbad))
- Delegate flash to the request [\#334](https://github.com/stimulusreflex/stimulus_reflex/pull/334) ([hopsoft](https://github.com/hopsoft))
- Opt-in form serialization & params overriding [\#325](https://github.com/stimulusreflex/stimulus_reflex/pull/325) ([s-s](https://github.com/s-s))
- Exit on failed sanity check, provide config to skip exit [\#318](https://github.com/stimulusreflex/stimulus_reflex/pull/318) ([RolandStuder](https://github.com/RolandStuder))

**Fixed bugs:**

- Console exception when reflex updates a page that didn't trigger the update [\#336](https://github.com/stimulusreflex/stimulus_reflex/issues/336)
- AlpineJS components not reinitalised after reflex [\#329](https://github.com/stimulusreflex/stimulus_reflex/issues/329)
- Encoding changes from UTF-8 to ASCII-8BIT [\#202](https://github.com/stimulusreflex/stimulus_reflex/issues/202)

**Closed issues:**

- ActionController::RoutingError with Rails 6 Engines [\#342](https://github.com/stimulusreflex/stimulus_reflex/issues/342)
- Wrong input name parsing [\#321](https://github.com/stimulusreflex/stimulus_reflex/issues/321)
- Stimulus' controllers are not reconnecting after reflex, why? [\#314](https://github.com/stimulusreflex/stimulus_reflex/issues/314)
- Documentation Request for a Rails 6.x app with 5.2 defaults [\#265](https://github.com/stimulusreflex/stimulus_reflex/issues/265)

**Merged pull requests:**

- \[docs\] StimulusReflex.debug= on left hand side [\#348](https://github.com/stimulusreflex/stimulus_reflex/pull/348) ([drnic](https://github.com/drnic))
- Fix page morphs inside Rails engines [\#344](https://github.com/stimulusreflex/stimulus_reflex/pull/344) ([leastbad](https://github.com/leastbad))
- Use Webpacker folder if available [\#343](https://github.com/stimulusreflex/stimulus_reflex/pull/343) ([coorasse](https://github.com/coorasse))
- feat: create a more robust package.json [\#340](https://github.com/stimulusreflex/stimulus_reflex/pull/340) ([ParamagicDev](https://github.com/ParamagicDev))
- Make StimulusReflex configurable and add an initializer [\#339](https://github.com/stimulusreflex/stimulus_reflex/pull/339) ([RolandStuder](https://github.com/RolandStuder))
- Aliases method\_name to action\_name [\#338](https://github.com/stimulusreflex/stimulus_reflex/pull/338) ([obie](https://github.com/obie))
- remove isolate concept and make behavior default [\#332](https://github.com/stimulusreflex/stimulus_reflex/pull/332) ([leastbad](https://github.com/leastbad))
- add signed/unsigned accessors to element [\#330](https://github.com/stimulusreflex/stimulus_reflex/pull/330) ([joshleblanc](https://github.com/joshleblanc))
- merge environment into ApplicationController and descendants [\#328](https://github.com/stimulusreflex/stimulus_reflex/pull/328) ([leastbad](https://github.com/leastbad))
- Move form-data merge logic to the server-side [\#327](https://github.com/stimulusreflex/stimulus_reflex/pull/327) ([marcoroth](https://github.com/marcoroth))
- fix for PR\#317 which was preventing server messages [\#326](https://github.com/stimulusreflex/stimulus_reflex/pull/326) ([leastbad](https://github.com/leastbad))
- introduce tab isolation mode [\#324](https://github.com/stimulusreflex/stimulus_reflex/pull/324) ([leastbad](https://github.com/leastbad))
- Force request encodings to be UTF-8 instead of ASCII-8BIT after a reflex [\#320](https://github.com/stimulusreflex/stimulus_reflex/pull/320) ([marcoroth](https://github.com/marcoroth))
- Append short section about resetting a form [\#319](https://github.com/stimulusreflex/stimulus_reflex/pull/319) ([julianrubisch](https://github.com/julianrubisch))
- lifecycle refactor: introduce new finalize stage, global reflexes dictionary [\#317](https://github.com/stimulusreflex/stimulus_reflex/pull/317) ([leastbad](https://github.com/leastbad))
- Update events.md [\#316](https://github.com/stimulusreflex/stimulus_reflex/pull/316) ([gahia](https://github.com/gahia))
- Proposal: Reduce bundle size and add a bundler for Stimulus Reflex javascript [\#315](https://github.com/stimulusreflex/stimulus_reflex/pull/315) ([ParamagicDev](https://github.com/ParamagicDev))

## [v3.3.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0) (2020-09-22)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre6...v3.3.0)

## [v3.3.0.pre6](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre6) (2020-09-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre5...v3.3.0.pre6)

**Implemented enhancements:**

- Support for token-based authentication [\#243](https://github.com/stimulusreflex/stimulus_reflex/pull/243) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- Authorization [\#292](https://github.com/stimulusreflex/stimulus_reflex/issues/292)
- Params incorrect for form submitted for nested resource  [\#290](https://github.com/stimulusreflex/stimulus_reflex/issues/290)
- Use set I18n.locale in Reflexes with Selector Morphs  [\#280](https://github.com/stimulusreflex/stimulus_reflex/issues/280)

**Merged pull requests:**

- add ready event after setupDeclarativeReflexes [\#312](https://github.com/stimulusreflex/stimulus_reflex/pull/312) ([leastbad](https://github.com/leastbad))
- Refactor sanity checks on boot [\#311](https://github.com/stimulusreflex/stimulus_reflex/pull/311) ([excid3](https://github.com/excid3))

## [v3.3.0.pre5](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre5) (2020-09-18)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre4...v3.3.0.pre5)

**Implemented enhancements:**

- Fail loudly if there's a version mismatch between the gem and the npm package. [\#294](https://github.com/stimulusreflex/stimulus_reflex/issues/294)

**Closed issues:**

- IE11 Support: "crypto" is undefined [\#308](https://github.com/stimulusreflex/stimulus_reflex/issues/308)
- Using `morph` gives error on missing Warden::Manager midddleware? [\#304](https://github.com/stimulusreflex/stimulus_reflex/issues/304)
- Update client controller template comments [\#298](https://github.com/stimulusreflex/stimulus_reflex/issues/298)

**Merged pull requests:**

- fixes and tweaks to client logging subsystem [\#313](https://github.com/stimulusreflex/stimulus_reflex/pull/313) ([leastbad](https://github.com/leastbad))
- Support IE11 msCrypto \(\#308\) [\#310](https://github.com/stimulusreflex/stimulus_reflex/pull/310) ([chooselife22](https://github.com/chooselife22))
- Print warning and exit if caching is disabled or npm/gem versions are mismatched [\#309](https://github.com/stimulusreflex/stimulus_reflex/pull/309) ([excid3](https://github.com/excid3))
- ActionCable connectivity events [\#307](https://github.com/stimulusreflex/stimulus_reflex/pull/307) ([leastbad](https://github.com/leastbad))
- Copyedits [\#306](https://github.com/stimulusreflex/stimulus_reflex/pull/306) ([CodingItWrong](https://github.com/CodingItWrong))
- add redis to cable.yml in development mode [\#305](https://github.com/stimulusreflex/stimulus_reflex/pull/305) ([leastbad](https://github.com/leastbad))
- Update morph-modes.md [\#302](https://github.com/stimulusreflex/stimulus_reflex/pull/302) ([scottbarrow](https://github.com/scottbarrow))
- Enhance controller templates docs [\#300](https://github.com/stimulusreflex/stimulus_reflex/pull/300) ([pinzonjulian](https://github.com/pinzonjulian))
- Avoid mismatching client and server versions [\#297](https://github.com/stimulusreflex/stimulus_reflex/pull/297) ([piotrwodz](https://github.com/piotrwodz))

## [v3.3.0.pre4](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre4) (2020-09-13)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre3...v3.3.0.pre4)

**Fixed bugs:**

- Lifecycle callbacks do not work [\#281](https://github.com/stimulusreflex/stimulus_reflex/issues/281)
- Fix timing issues with post-Reflex lifecycle callbacks [\#299](https://github.com/stimulusreflex/stimulus_reflex/pull/299) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- self-referential data-reflex-root [\#301](https://github.com/stimulusreflex/stimulus_reflex/issues/301)
- data-reflex-permanent not working when using slim templates [\#295](https://github.com/stimulusreflex/stimulus_reflex/issues/295)
- undefined method `rescue\_with\_handler' whit reflex action such as "click-\>…" or "change-\>…" [\#287](https://github.com/stimulusreflex/stimulus_reflex/issues/287)

**Merged pull requests:**

- Fixed typo in sample code. [\#296](https://github.com/stimulusreflex/stimulus_reflex/pull/296) ([jclarke](https://github.com/jclarke))

## [v3.3.0.pre3](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre3) (2020-08-31)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre2...v3.3.0.pre3)

**Fixed bugs:**

- First argument of type "object" in this.stimulate\(\) will always be assigned to options. [\#278](https://github.com/stimulusreflex/stimulus_reflex/issues/278)
- Allow morphs to run before triggering success/after [\#286](https://github.com/stimulusreflex/stimulus_reflex/pull/286) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Reflex ignores turbolinks cached pages [\#288](https://github.com/stimulusreflex/stimulus_reflex/issues/288)
- Issue with Stimulus Reflex and ViewComponent [\#284](https://github.com/stimulusreflex/stimulus_reflex/issues/284)
- controller inheritance does not seem to work [\#283](https://github.com/stimulusreflex/stimulus_reflex/issues/283)
- Cannot read property 'schema' of undefined [\#282](https://github.com/stimulusreflex/stimulus_reflex/issues/282)
- Reflex on form submit does not get parameter from input\[type="file"\] [\#277](https://github.com/stimulusreflex/stimulus_reflex/issues/277)
- jQuery Plugins [\#246](https://github.com/stimulusreflex/stimulus_reflex/issues/246)
- ActiveStorage variants performance [\#242](https://github.com/stimulusreflex/stimulus_reflex/issues/242)
- Unnecessary body update after text\_content [\#186](https://github.com/stimulusreflex/stimulus_reflex/issues/186)
- Warn about enabling Rails after running stimulus reflex' initializer [\#185](https://github.com/stimulusreflex/stimulus_reflex/issues/185)
- Integration tests for stimulus-reflex [\#162](https://github.com/stimulusreflex/stimulus_reflex/issues/162)
- Clearer explanation of quickstart example without javascript.  [\#149](https://github.com/stimulusreflex/stimulus_reflex/issues/149)
- Webpack compilation fails with rails/webpacker 3.6 [\#83](https://github.com/stimulusreflex/stimulus_reflex/issues/83)

**Merged pull requests:**

- Check if reflex exists before using it [\#293](https://github.com/stimulusreflex/stimulus_reflex/pull/293) ([joshleblanc](https://github.com/joshleblanc))
- Add instructions for existing projects [\#291](https://github.com/stimulusreflex/stimulus_reflex/pull/291) ([gerrywastaken](https://github.com/gerrywastaken))
- Fix argument of type object always being assigned to options [\#279](https://github.com/stimulusreflex/stimulus_reflex/pull/279) ([shawnleong](https://github.com/shawnleong))
- Simplify devise authentication logic \(in docs\) [\#276](https://github.com/stimulusreflex/stimulus_reflex/pull/276) ([inner-whisper](https://github.com/inner-whisper))
- Bump lodash from 4.17.15 to 4.17.19 in /javascript [\#275](https://github.com/stimulusreflex/stimulus_reflex/pull/275) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v3.3.0.pre2](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre2) (2020-07-17)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre1...v3.3.0.pre2)

**Closed issues:**

- afterReflex not always firing on morph with selectors [\#269](https://github.com/stimulusreflex/stimulus_reflex/issues/269)
- Lifecycle hooks [\#266](https://github.com/stimulusreflex/stimulus_reflex/issues/266)
- Stimulus Reflex with Rspec not working [\#263](https://github.com/stimulusreflex/stimulus_reflex/issues/263)

**Merged pull requests:**

- Smarter warnings when element not found [\#274](https://github.com/stimulusreflex/stimulus_reflex/pull/274) ([hopsoft](https://github.com/hopsoft))
- Add the attributes to the warning message when element not found [\#273](https://github.com/stimulusreflex/stimulus_reflex/pull/273) ([hopsoft](https://github.com/hopsoft))
- Update find element to ignore SR attrs [\#272](https://github.com/stimulusreflex/stimulus_reflex/pull/272) ([hopsoft](https://github.com/hopsoft))
- Refactor of the morph feature [\#270](https://github.com/stimulusreflex/stimulus_reflex/pull/270) ([hopsoft](https://github.com/hopsoft))
- coerce html arguments to string type [\#268](https://github.com/stimulusreflex/stimulus_reflex/pull/268) ([leastbad](https://github.com/leastbad))
- Update deployment docs after the official AnyCable 1.0 release [\#267](https://github.com/stimulusreflex/stimulus_reflex/pull/267) ([rmacklin](https://github.com/rmacklin))

## [v3.3.0.pre1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre1) (2020-07-08)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.3.0.pre0...v3.3.0.pre1)

**Merged pull requests:**

- Fix selector morphs for updating partials and ViewComponents [\#262](https://github.com/stimulusreflex/stimulus_reflex/pull/262) ([leastbad](https://github.com/leastbad))

## [v3.3.0.pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.3.0.pre0) (2020-07-04)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.3...v3.3.0.pre0)

**Implemented enhancements:**

- Returns more helpful error message if Reflex doesn't exist [\#254](https://github.com/stimulusreflex/stimulus_reflex/pull/254) ([leastbad](https://github.com/leastbad))
- Update install.rake to handle Typescript [\#241](https://github.com/stimulusreflex/stimulus_reflex/pull/241) ([iv-mexx](https://github.com/iv-mexx))
- Morph Modes: page, selector and nothing [\#211](https://github.com/stimulusreflex/stimulus_reflex/pull/211) ([leastbad](https://github.com/leastbad))

**Fixed bugs:**

- Limit MutationObserver mutations [\#256](https://github.com/stimulusreflex/stimulus_reflex/pull/256) ([jasoncharnes](https://github.com/jasoncharnes))

**Closed issues:**

- beforeUpdate/updateSuccess/updateError functions deprecated? [\#255](https://github.com/stimulusreflex/stimulus_reflex/issues/255)
- Error handling will fail if reflex is not defined [\#253](https://github.com/stimulusreflex/stimulus_reflex/issues/253)
- Select with data-reflex in Firefox flickers [\#251](https://github.com/stimulusreflex/stimulus_reflex/issues/251)
- data-reflex-attributes vs data-reflex-dataset [\#237](https://github.com/stimulusreflex/stimulus_reflex/issues/237)
- Shorthand action notations corresponding to stimulus [\#233](https://github.com/stimulusreflex/stimulus_reflex/issues/233)
- Lifecycle methods only called for one reflex [\#225](https://github.com/stimulusreflex/stimulus_reflex/issues/225)
- Tweak the generator so we can specify reflex actions [\#219](https://github.com/stimulusreflex/stimulus_reflex/issues/219)
- Docs: Clarify forcing DOM update with authentication [\#123](https://github.com/stimulusreflex/stimulus_reflex/issues/123)
- ActiveJob integration example [\#112](https://github.com/stimulusreflex/stimulus_reflex/issues/112)

**Merged pull requests:**

- Prep for pre release of 3.3.0 [\#259](https://github.com/stimulusreflex/stimulus_reflex/pull/259) ([hopsoft](https://github.com/hopsoft))
- Fallback to first Stimulus controller in array [\#257](https://github.com/stimulusreflex/stimulus_reflex/pull/257) ([jasoncharnes](https://github.com/jasoncharnes))
- Fix cases where plural reflexes were unresolved [\#252](https://github.com/stimulusreflex/stimulus_reflex/pull/252) ([joshleblanc](https://github.com/joshleblanc))
- warn against collections of identical elements that trigger reflexes [\#250](https://github.com/stimulusreflex/stimulus_reflex/pull/250) ([leastbad](https://github.com/leastbad))
- always calls params to persist them into controller action [\#249](https://github.com/stimulusreflex/stimulus_reflex/pull/249) ([RolandStuder](https://github.com/RolandStuder))
- Update deployment.md [\#248](https://github.com/stimulusreflex/stimulus_reflex/pull/248) ([user073](https://github.com/user073))
- Update reflexes.md [\#247](https://github.com/stimulusreflex/stimulus_reflex/pull/247) ([user073](https://github.com/user073))
- Bump actionpack from 6.0.3.1 to 6.0.3.2 [\#245](https://github.com/stimulusreflex/stimulus_reflex/pull/245) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump rack from 2.2.2 to 2.2.3 [\#244](https://github.com/stimulusreflex/stimulus_reflex/pull/244) ([dependabot[bot]](https://github.com/apps/dependabot))
- Revert "Revert "Add instructions for pulling the user id out of session storage"" [\#240](https://github.com/stimulusreflex/stimulus_reflex/pull/240) ([leastbad](https://github.com/leastbad))
- Revert "Add instructions for pulling the user id out of session storage" [\#239](https://github.com/stimulusreflex/stimulus_reflex/pull/239) ([leastbad](https://github.com/leastbad))
- Add instructions for pulling the user id out of session storage [\#238](https://github.com/stimulusreflex/stimulus_reflex/pull/238) ([mtomov](https://github.com/mtomov))
- adds params documentation [\#230](https://github.com/stimulusreflex/stimulus_reflex/pull/230) ([RolandStuder](https://github.com/RolandStuder))
- Allow to pass reflex action names to reflex generator [\#224](https://github.com/stimulusreflex/stimulus_reflex/pull/224) ([marcoroth](https://github.com/marcoroth))

## [v3.2.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.3) (2020-06-15)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.2...v3.2.3)

**Fixed bugs:**

- Add more smarts to \_\_perform [\#235](https://github.com/stimulusreflex/stimulus_reflex/pull/235) ([hopsoft](https://github.com/hopsoft))
- \_\_perform had a bug where it was only ever calling the first event [\#234](https://github.com/stimulusreflex/stimulus_reflex/pull/234) ([leastbad](https://github.com/leastbad))
- merges insteads of overwrites params for reflex actions with form data [\#231](https://github.com/stimulusreflex/stimulus_reflex/pull/231) ([RolandStuder](https://github.com/RolandStuder))

**Closed issues:**

- "Uncaught \(in promise\)" error after failed declarative reflex [\#170](https://github.com/stimulusreflex/stimulus_reflex/issues/170)

**Merged pull requests:**

- Fix typos in the documentation [\#228](https://github.com/stimulusreflex/stimulus_reflex/pull/228) ([dlt](https://github.com/dlt))

## [v3.2.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.2) (2020-06-06)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.2.pre1...v3.2.2)

**Closed issues:**

- Issue with doing a partial dom update [\#223](https://github.com/stimulusreflex/stimulus_reflex/issues/223)

## [v3.2.2.pre1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.2.pre1) (2020-05-30)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.2.pre0...v3.2.2.pre1)

**Fixed bugs:**

- Session lost after throw :abort [\#221](https://github.com/stimulusreflex/stimulus_reflex/issues/221)
- Fix multipleInstances convenience method [\#220](https://github.com/stimulusreflex/stimulus_reflex/pull/220) ([julianrubisch](https://github.com/julianrubisch))

**Merged pull requests:**

- Fix calling wrong controller lifecycle methods [\#226](https://github.com/stimulusreflex/stimulus_reflex/pull/226) ([davidalejandroaguilar](https://github.com/davidalejandroaguilar))
- Always commit session [\#222](https://github.com/stimulusreflex/stimulus_reflex/pull/222) ([hopsoft](https://github.com/hopsoft))

## [v3.2.2.pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.2.pre0) (2020-05-27)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.1...v3.2.2.pre0)

**Implemented enhancements:**

- Add a halted lifecycle event [\#190](https://github.com/stimulusreflex/stimulus_reflex/issues/190)
- Allow extractElementAttributes to use a checkbox list [\#147](https://github.com/stimulusreflex/stimulus_reflex/issues/147)
- reflex\_name restriction loosening [\#212](https://github.com/stimulusreflex/stimulus_reflex/pull/212) ([leastbad](https://github.com/leastbad))
- Make element even more user friendly [\#210](https://github.com/stimulusreflex/stimulus_reflex/pull/210) ([hopsoft](https://github.com/hopsoft))
- Form parameters [\#204](https://github.com/stimulusreflex/stimulus_reflex/pull/204) ([jasoncharnes](https://github.com/jasoncharnes))
- Map hashes in incoming arguments using with\_indifferent\_access [\#203](https://github.com/stimulusreflex/stimulus_reflex/pull/203) ([jaredcwhite](https://github.com/jaredcwhite))
- Combine dataset with data-attributes from parent elements on reflex call [\#200](https://github.com/stimulusreflex/stimulus_reflex/pull/200) ([marcoroth](https://github.com/marcoroth))
- Setup mutation aware declarative reflexes [\#197](https://github.com/stimulusreflex/stimulus_reflex/pull/197) ([hopsoft](https://github.com/hopsoft))

**Fixed bugs:**

- Text area values are lost if re-sized [\#195](https://github.com/stimulusreflex/stimulus_reflex/issues/195)

**Closed issues:**

- Accessing dataset as before is returning nil [\#218](https://github.com/stimulusreflex/stimulus_reflex/issues/218)
- Spurious console error using data-reflex-root and CSS attribute selector [\#207](https://github.com/stimulusreflex/stimulus_reflex/issues/207)
- ActionController Parameters [\#199](https://github.com/stimulusreflex/stimulus_reflex/issues/199)

**Merged pull requests:**

- Bump activesupport from 6.0.3 to 6.0.3.1 [\#217](https://github.com/stimulusreflex/stimulus_reflex/pull/217) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump activestorage from 6.0.3 to 6.0.3.1 [\#216](https://github.com/stimulusreflex/stimulus_reflex/pull/216) ([dependabot[bot]](https://github.com/apps/dependabot))
- Bump actionpack from 6.0.3 to 6.0.3.1 [\#215](https://github.com/stimulusreflex/stimulus_reflex/pull/215) ([dependabot[bot]](https://github.com/apps/dependabot))
- Update dataset handling and some minor refactoring to better naming [\#214](https://github.com/stimulusreflex/stimulus_reflex/pull/214) ([hopsoft](https://github.com/hopsoft))
- Stimulus reflexData assignment after callback  [\#208](https://github.com/stimulusreflex/stimulus_reflex/pull/208) ([jasoncharnes](https://github.com/jasoncharnes))
- Loosen Rails requirement to 5.2 with instructions [\#205](https://github.com/stimulusreflex/stimulus_reflex/pull/205) ([jasoncharnes](https://github.com/jasoncharnes))
- Fix undefined is not an object for Object.keys in log.js [\#201](https://github.com/stimulusreflex/stimulus_reflex/pull/201) ([marcoroth](https://github.com/marcoroth))
- Small typo/grammar fix in quickstart doc. [\#198](https://github.com/stimulusreflex/stimulus_reflex/pull/198) ([acoffman](https://github.com/acoffman))
- Add halted lifecycle event [\#193](https://github.com/stimulusreflex/stimulus_reflex/pull/193) ([websebdev](https://github.com/websebdev))
- 147 extract multiple checkbox values [\#175](https://github.com/stimulusreflex/stimulus_reflex/pull/175) ([julianrubisch](https://github.com/julianrubisch))

## [v3.2.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.1) (2020-05-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.0...v3.2.1)

**Merged pull requests:**

- Prevent halting if reflex returns false [\#194](https://github.com/stimulusreflex/stimulus_reflex/pull/194) ([hopsoft](https://github.com/hopsoft))

## [v3.2.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.0) (2020-05-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.0.pre1...v3.2.0)

## [v3.2.0.pre1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.0.pre1) (2020-05-08)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.0-pre0...v3.2.0.pre1)

**Fixed bugs:**

- Add guard to morph that checks stimulusReflex [\#191](https://github.com/stimulusreflex/stimulus_reflex/pull/191) ([hopsoft](https://github.com/hopsoft))

## [v3.2.0-pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.0-pre0) (2020-05-07)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.2.0.pre0...v3.2.0-pre0)

## [v3.2.0.pre0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.2.0.pre0) (2020-05-07)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.1.4...v3.2.0.pre0)

**Implemented enhancements:**

- Stimulate without a reflex target [\#179](https://github.com/stimulusreflex/stimulus_reflex/issues/179)
- Reflex callbacks [\#155](https://github.com/stimulusreflex/stimulus_reflex/issues/155)
- Replace camelize with homegrown version [\#184](https://github.com/stimulusreflex/stimulus_reflex/pull/184) ([jonathan-s](https://github.com/jonathan-s))
- Replace uuid4 dependency with function in repo [\#181](https://github.com/stimulusreflex/stimulus_reflex/pull/181) ([jonathan-s](https://github.com/jonathan-s))
- Allow channel exceptions to be rescuable [\#180](https://github.com/stimulusreflex/stimulus_reflex/pull/180) ([dark-panda](https://github.com/dark-panda))
- add console log messages for every reflex call [\#163](https://github.com/stimulusreflex/stimulus_reflex/pull/163) ([marcoroth](https://github.com/marcoroth))
- add reflex callbacks [\#160](https://github.com/stimulusreflex/stimulus_reflex/pull/160) ([websebdev](https://github.com/websebdev))

**Fixed bugs:**

-  Pluralize the generated class name, so that will match with the file name [\#178](https://github.com/stimulusreflex/stimulus_reflex/pull/178) ([dark88888](https://github.com/dark88888))

**Closed issues:**

-  The ActionCable connection is not open! `this.isActionCableConnectionOpen\(\)` must return true before calling `this.stimulate\(\)` [\#187](https://github.com/stimulusreflex/stimulus_reflex/issues/187)
- Promises just resolve with last Partial DOM update [\#171](https://github.com/stimulusreflex/stimulus_reflex/issues/171)

**Merged pull requests:**

- Some housekeeping [\#189](https://github.com/stimulusreflex/stimulus_reflex/pull/189) ([hopsoft](https://github.com/hopsoft))
- Allow to call stimulate without a reflex target [\#188](https://github.com/stimulusreflex/stimulus_reflex/pull/188) ([marcoroth](https://github.com/marcoroth))
- Fix bug in super documentation [\#174](https://github.com/stimulusreflex/stimulus_reflex/pull/174) ([silva96](https://github.com/silva96))

## [v3.1.4](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.1.4) (2020-04-27)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.1.3...v3.1.4)

**Implemented enhancements:**

- TypeScript typing support [\#152](https://github.com/stimulusreflex/stimulus_reflex/issues/152)

**Fixed bugs:**

- Possible bug when about to perform cableready operations [\#166](https://github.com/stimulusreflex/stimulus_reflex/issues/166)
- Reflex not binding to ajax loaded content [\#161](https://github.com/stimulusreflex/stimulus_reflex/issues/161)
- Input field values sometimes remain [\#159](https://github.com/stimulusreflex/stimulus_reflex/issues/159)
- remove changelog rake task [\#150](https://github.com/stimulusreflex/stimulus_reflex/pull/150) ([andrewmcodes](https://github.com/andrewmcodes))

**Closed issues:**

- Devise authenticated routes not supported anymore [\#173](https://github.com/stimulusreflex/stimulus_reflex/issues/173)
- CableReady detected an error in morph! Event is not a constructor [\#165](https://github.com/stimulusreflex/stimulus_reflex/issues/165)
- Testing Integrations [\#164](https://github.com/stimulusreflex/stimulus_reflex/issues/164)
- Error during install: "File unchanged! The supplied flag value not found!  app/javascript/packs/application.js" [\#118](https://github.com/stimulusreflex/stimulus_reflex/issues/118)
- Make the javascript in stimulus-reflex websocket agnostic [\#113](https://github.com/stimulusreflex/stimulus_reflex/issues/113)

**Merged pull requests:**

- prettier-standard: include all js files in the project [\#177](https://github.com/stimulusreflex/stimulus_reflex/pull/177) ([marcoroth](https://github.com/marcoroth))
- Remove implicit permanent for text inputs [\#176](https://github.com/stimulusreflex/stimulus_reflex/pull/176) ([hopsoft](https://github.com/hopsoft))
- Support devise authenticated routes [\#172](https://github.com/stimulusreflex/stimulus_reflex/pull/172) ([db0sch](https://github.com/db0sch))
- setupDeclarativeReflexes export with UJS support [\#169](https://github.com/stimulusreflex/stimulus_reflex/pull/169) ([leastbad](https://github.com/leastbad))
- Fix compilation issue [\#168](https://github.com/stimulusreflex/stimulus_reflex/pull/168) ([jonathan-s](https://github.com/jonathan-s))

## [v3.1.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.1.3) (2020-04-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.1.2...v3.1.3)

**Implemented enhancements:**

- Server initiated redirects [\#25](https://github.com/stimulusreflex/stimulus_reflex/issues/25)

**Fixed bugs:**

- Unable to register the ActionCable Consumer [\#156](https://github.com/stimulusreflex/stimulus_reflex/issues/156)
- Remove unneeded registerConsumer logic [\#158](https://github.com/stimulusreflex/stimulus_reflex/pull/158) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Scoping when using Stimulus does not work as expected [\#144](https://github.com/stimulusreflex/stimulus_reflex/issues/144)
- Shared connections to reduce websocket connections? [\#136](https://github.com/stimulusreflex/stimulus_reflex/issues/136)
- routing reflexes to controllers [\#97](https://github.com/stimulusreflex/stimulus_reflex/issues/97)
- Time for introducing a develop branch? [\#84](https://github.com/stimulusreflex/stimulus_reflex/issues/84)
- out-of-band Reflex updates [\#64](https://github.com/stimulusreflex/stimulus_reflex/issues/64)

## [v3.1.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.1.2) (2020-04-16)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.1.1...v3.1.2)

## [v3.1.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.1.1) (2020-04-16)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.1.0...v3.1.1)

**Fixed bugs:**

- Cannot read property 'removeEventListener' of undefined after updating to 3.1.0 [\#151](https://github.com/stimulusreflex/stimulus_reflex/issues/151)

**Closed issues:**

- Setup & Quick Start guide from scratch results in showstopping error [\#153](https://github.com/stimulusreflex/stimulus_reflex/issues/153)

**Merged pull requests:**

- Trap errors in registerConsumer [\#154](https://github.com/stimulusreflex/stimulus_reflex/pull/154) ([hopsoft](https://github.com/hopsoft))

## [v3.1.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.1.0) (2020-04-15)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v3.0.0...v3.1.0)

**Implemented enhancements:**

- Check the ActionCable connection on stimuluate [\#148](https://github.com/stimulusreflex/stimulus_reflex/pull/148) ([hopsoft](https://github.com/hopsoft))
- Attach element.tagName to extracted attributes [\#146](https://github.com/stimulusreflex/stimulus_reflex/pull/146) ([julianrubisch](https://github.com/julianrubisch))
- Create dynamic changelog [\#143](https://github.com/stimulusreflex/stimulus_reflex/pull/143) ([andrewmcodes](https://github.com/andrewmcodes))
- add funding file [\#141](https://github.com/stimulusreflex/stimulus_reflex/pull/141) ([andrewmcodes](https://github.com/andrewmcodes))

**Fixed bugs:**

- Allow other CableReady operations to perform [\#145](https://github.com/stimulusreflex/stimulus_reflex/pull/145) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Non-morph operations are not executed by CableReady on errors [\#139](https://github.com/stimulusreflex/stimulus_reflex/issues/139)
- Pass element tagname in reflex [\#137](https://github.com/stimulusreflex/stimulus_reflex/issues/137)
- ActionCable npm package renamed [\#132](https://github.com/stimulusreflex/stimulus_reflex/issues/132)

**Merged pull requests:**

- Allow \#stimulate to use promises [\#142](https://github.com/stimulusreflex/stimulus_reflex/pull/142) ([dark-panda](https://github.com/dark-panda))

## [v3.0.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v3.0.0) (2020-04-06)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.2.3...v3.0.0)

**Breaking changes:**

- Update ActionCable JS dep to @rails/actioncable [\#135](https://github.com/stimulusreflex/stimulus_reflex/pull/135) ([hopsoft](https://github.com/hopsoft))

**Implemented enhancements:**

- update install script to set session store [\#134](https://github.com/stimulusreflex/stimulus_reflex/pull/134) ([leastbad](https://github.com/leastbad))
- update package.json and readme [\#133](https://github.com/stimulusreflex/stimulus_reflex/pull/133) ([andrewmcodes](https://github.com/andrewmcodes))

**Closed issues:**

- \[WIP\] AnyCable and Stimulus Reflex [\#46](https://github.com/stimulusreflex/stimulus_reflex/issues/46)

## [v2.2.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.2.3) (2020-03-27)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.2.2...v2.2.3)

**Implemented enhancements:**

- Reload session prior to each reflex accessing it [\#131](https://github.com/stimulusreflex/stimulus_reflex/pull/131) ([hopsoft](https://github.com/hopsoft))
- tweak prettier-standard and add actions caching [\#125](https://github.com/stimulusreflex/stimulus_reflex/pull/125) ([andrewmcodes](https://github.com/andrewmcodes))

**Closed issues:**

- Cannot read property 'stimulusReflexController' of null [\#127](https://github.com/stimulusreflex/stimulus_reflex/issues/127)

**Merged pull requests:**

- Bump actionview from 6.0.2.1 to 6.0.2.2 [\#128](https://github.com/stimulusreflex/stimulus_reflex/pull/128) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v2.2.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.2.2) (2020-03-04)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.2.1...v2.2.2)

**Implemented enhancements:**

- Commit session after rerendering page [\#124](https://github.com/stimulusreflex/stimulus_reflex/pull/124) ([hopsoft](https://github.com/hopsoft))
- Propose post install message [\#122](https://github.com/stimulusreflex/stimulus_reflex/pull/122) ([julianrubisch](https://github.com/julianrubisch))

## [v2.2.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.2.1) (2020-02-28)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.2.0...v2.2.1)

## [v2.2.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.2.0) (2020-02-28)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.9...v2.2.0)

**Implemented enhancements:**

- Explicit and implicit registering of the ActionCable consumer [\#116](https://github.com/stimulusreflex/stimulus_reflex/pull/116) ([hopsoft](https://github.com/hopsoft))

## [v2.1.9](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.9) (2020-02-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.8...v2.1.9)

**Implemented enhancements:**

- Add lifecycle events [\#114](https://github.com/stimulusreflex/stimulus_reflex/issues/114)
- Setup DOM event based lifecycle [\#115](https://github.com/stimulusreflex/stimulus_reflex/pull/115) ([hopsoft](https://github.com/hopsoft))

## [v2.1.8](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.8) (2020-01-27)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.7...v2.1.8)

**Implemented enhancements:**

- More defense in the received handler [\#107](https://github.com/stimulusreflex/stimulus_reflex/pull/107) ([hopsoft](https://github.com/hopsoft))

**Fixed bugs:**

- Fix bug related to trailing slash in URL path [\#111](https://github.com/stimulusreflex/stimulus_reflex/pull/111) ([hopsoft](https://github.com/hopsoft))

## [v2.1.7](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.7) (2019-12-28)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.6...v2.1.7)

**Implemented enhancements:**

- Support devise authenticated routes [\#105](https://github.com/stimulusreflex/stimulus_reflex/pull/105) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- SR cannot re-render authenticated devise routes [\#104](https://github.com/stimulusreflex/stimulus_reflex/issues/104)
- Docs formatting broken in Persistence section [\#93](https://github.com/stimulusreflex/stimulus_reflex/issues/93)

## [v2.1.6](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.6) (2019-12-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.5...v2.1.6)

**Implemented enhancements:**

- StimulusReflex::Channel - Error messages include stack trace info [\#100](https://github.com/stimulusreflex/stimulus_reflex/pull/100) ([szTheory](https://github.com/szTheory))

**Closed issues:**

- Demo appears to be broken [\#101](https://github.com/stimulusreflex/stimulus_reflex/issues/101)

## [v2.1.5](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.5) (2019-11-04)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.4...v2.1.5)

**Implemented enhancements:**

- Custom Stimulus schema breaks Reflex [\#91](https://github.com/stimulusreflex/stimulus_reflex/issues/91)
- Add schema support [\#94](https://github.com/stimulusreflex/stimulus_reflex/pull/94) ([hopsoft](https://github.com/hopsoft))
- inherit stimulus schema [\#92](https://github.com/stimulusreflex/stimulus_reflex/pull/92) ([nickyvanurk](https://github.com/nickyvanurk))
- Single source of truth [\#76](https://github.com/stimulusreflex/stimulus_reflex/pull/76) ([leastbad](https://github.com/leastbad))

**Fixed bugs:**

- Cleanup and fixes around lifecycle dispatch [\#121](https://github.com/stimulusreflex/stimulus_reflex/pull/121) ([hopsoft](https://github.com/hopsoft))
- Use application.js as fallback file path [\#82](https://github.com/stimulusreflex/stimulus_reflex/pull/82) ([julianrubisch](https://github.com/julianrubisch))

**Closed issues:**

- Slack Community [\#90](https://github.com/stimulusreflex/stimulus_reflex/issues/90)
- Installer fails on fresh Rails 5.2.3 app w/ webpacker 3.6 [\#81](https://github.com/stimulusreflex/stimulus_reflex/issues/81)
- Correct List Order in setup.md under Rooms Section [\#78](https://github.com/stimulusreflex/stimulus_reflex/issues/78)
- Scoped onClick event [\#73](https://github.com/stimulusreflex/stimulus_reflex/issues/73)

## [v2.1.4](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.4) (2019-10-19)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.3...v2.1.4)

**Implemented enhancements:**

- Add CodeFund sponsorship [\#75](https://github.com/stimulusreflex/stimulus_reflex/pull/75) ([coderberry](https://github.com/coderberry))

**Fixed bugs:**

- Don't assume that connection identifiers are model instances [\#77](https://github.com/stimulusreflex/stimulus_reflex/pull/77) ([hopsoft](https://github.com/hopsoft))

## [v2.1.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.3) (2019-10-16)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.2...v2.1.3)

**Implemented enhancements:**

- Create Rails generators [\#3](https://github.com/stimulusreflex/stimulus_reflex/issues/3)
- Update installer [\#71](https://github.com/stimulusreflex/stimulus_reflex/pull/71) ([hopsoft](https://github.com/hopsoft))
- Tweak generators [\#69](https://github.com/stimulusreflex/stimulus_reflex/pull/69) ([hopsoft](https://github.com/hopsoft))
- add generators [\#67](https://github.com/stimulusreflex/stimulus_reflex/pull/67) ([andrewmcodes](https://github.com/andrewmcodes))

**Fixed bugs:**

- too many afterReflex/reflexSuccess callbacks [\#68](https://github.com/stimulusreflex/stimulus_reflex/issues/68)
- Prevent redundant `after` lifecycle callbacks [\#70](https://github.com/stimulusreflex/stimulus_reflex/pull/70) ([hopsoft](https://github.com/hopsoft))

## [v2.1.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.2) (2019-10-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.1...v2.1.2)

## [v2.1.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.1) (2019-10-08)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.1.0...v2.1.1)

**Fixed bugs:**

- Fix issue in reflex root discovery [\#66](https://github.com/stimulusreflex/stimulus_reflex/pull/66) ([hopsoft](https://github.com/hopsoft))

## [v2.1.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.1.0) (2019-10-07)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.0.2...v2.1.0)

**Implemented enhancements:**

- Move ActionCable room configuration to controller registration [\#51](https://github.com/stimulusreflex/stimulus_reflex/issues/51)
- Client side call-backs? [\#34](https://github.com/stimulusreflex/stimulus_reflex/issues/34)
- Scoped register\(\)? [\#26](https://github.com/stimulusreflex/stimulus_reflex/issues/26)
- Add guard to verify same URL prior to morph [\#63](https://github.com/stimulusreflex/stimulus_reflex/pull/63) ([hopsoft](https://github.com/hopsoft))
- Add reflex name to the lifecycle args [\#62](https://github.com/stimulusreflex/stimulus_reflex/pull/62) ([hopsoft](https://github.com/hopsoft))
- Refactor some helper methods out of main file [\#61](https://github.com/stimulusreflex/stimulus_reflex/pull/61) ([hopsoft](https://github.com/hopsoft))
- Documentation update [\#58](https://github.com/stimulusreflex/stimulus_reflex/pull/58) ([leastbad](https://github.com/leastbad))
- \# Support for data-reflex-permanent [\#57](https://github.com/stimulusreflex/stimulus_reflex/pull/57) ([hopsoft](https://github.com/hopsoft))
- Stricter parsing of attributes [\#56](https://github.com/stimulusreflex/stimulus_reflex/pull/56) ([hopsoft](https://github.com/hopsoft))
- \# Use inner\_html to avoid reliance on HTMLTemplateElement behavior [\#55](https://github.com/stimulusreflex/stimulus_reflex/pull/55) ([hopsoft](https://github.com/hopsoft))
- Trim values before attribute assignment [\#54](https://github.com/stimulusreflex/stimulus_reflex/pull/54) ([hopsoft](https://github.com/hopsoft))
- add test action [\#53](https://github.com/stimulusreflex/stimulus_reflex/pull/53) ([andrewmcodes](https://github.com/andrewmcodes))
- Scoped Stimulus Reflex controllers [\#43](https://github.com/stimulusreflex/stimulus_reflex/pull/43) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- Install StandardJS linter [\#40](https://github.com/stimulusreflex/stimulus_reflex/issues/40)

## [v2.0.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.0.2) (2019-09-30)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.0.1...v2.0.2)

**Implemented enhancements:**

- Add support to configure room via register option [\#52](https://github.com/stimulusreflex/stimulus_reflex/pull/52) ([hopsoft](https://github.com/hopsoft))
- Move gitbook files to docs [\#49](https://github.com/stimulusreflex/stimulus_reflex/pull/49) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Formatting issues on README [\#48](https://github.com/stimulusreflex/stimulus_reflex/issues/48)

## [v2.0.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.0.1) (2019-09-28)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v2.0.0...v2.0.1)

**Implemented enhancements:**

- Provide before/after callbacks for calls delegated to server side Stimulus controllers [\#4](https://github.com/stimulusreflex/stimulus_reflex/issues/4)
- Updated Minimal Javascript Example in README.md [\#47](https://github.com/stimulusreflex/stimulus_reflex/pull/47) ([kobaltz](https://github.com/kobaltz))
- Setup StimulusReflex controller callbacks [\#45](https://github.com/stimulusreflex/stimulus_reflex/pull/45) ([hopsoft](https://github.com/hopsoft))
- add .vscode directory to .gitignore [\#42](https://github.com/stimulusreflex/stimulus_reflex/pull/42) ([andrewmcodes](https://github.com/andrewmcodes))
- Allow override of default controller [\#37](https://github.com/stimulusreflex/stimulus_reflex/pull/37) ([hopsoft](https://github.com/hopsoft))
- update the name of the actions per feedback [\#36](https://github.com/stimulusreflex/stimulus_reflex/pull/36) ([andrewmcodes](https://github.com/andrewmcodes))
- update github templates [\#35](https://github.com/stimulusreflex/stimulus_reflex/pull/35) ([andrewmcodes](https://github.com/andrewmcodes))
- Tighten up security of remote invocation [\#32](https://github.com/stimulusreflex/stimulus_reflex/pull/32) ([hopsoft](https://github.com/hopsoft))

**Fixed bugs:**

- Reflex is a reflex [\#38](https://github.com/stimulusreflex/stimulus_reflex/pull/38) ([leastbad](https://github.com/leastbad))

**Closed issues:**

- Add GH templates [\#30](https://github.com/stimulusreflex/stimulus_reflex/issues/30)

## [v2.0.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v2.0.0) (2019-09-11)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v1.1.1...v2.0.0)

**Implemented enhancements:**

- update github action triggers [\#29](https://github.com/stimulusreflex/stimulus_reflex/pull/29) ([andrewmcodes](https://github.com/andrewmcodes))
- Add support for declarative stimulus/reflex behavior [\#28](https://github.com/stimulusreflex/stimulus_reflex/pull/28) ([hopsoft](https://github.com/hopsoft))

**Fixed bugs:**

- fix merge issue for GitHub actions [\#27](https://github.com/stimulusreflex/stimulus_reflex/pull/27) ([andrewmcodes](https://github.com/andrewmcodes))

## [v1.1.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v1.1.1) (2019-09-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v1.1.0...v1.1.1)

## [v1.1.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v1.1.0) (2019-09-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v1.0.2...v1.1.0)

**Implemented enhancements:**

- Implicitly send DOM attributes to reflex methods [\#21](https://github.com/stimulusreflex/stimulus_reflex/pull/21) ([hopsoft](https://github.com/hopsoft))
- Add Ruby magic comment [\#18](https://github.com/stimulusreflex/stimulus_reflex/pull/18) ([dixpac](https://github.com/dixpac))
- Add GitHub Actions for Linters [\#17](https://github.com/stimulusreflex/stimulus_reflex/pull/17) ([andrewmcodes](https://github.com/andrewmcodes))

**Fixed bugs:**

- Fix GitHub Actions [\#20](https://github.com/stimulusreflex/stimulus_reflex/pull/20) ([andrewmcodes](https://github.com/andrewmcodes))

## [v1.0.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v1.0.2) (2019-08-17)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v1.0.1...v1.0.2)

**Implemented enhancements:**

- Small performance enhancements [\#16](https://github.com/stimulusreflex/stimulus_reflex/pull/16) ([hopsoft](https://github.com/hopsoft))

## [v1.0.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v1.0.1) (2019-08-10)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v1.0.0...v1.0.1)

**Implemented enhancements:**

- Add support for rooms [\#11](https://github.com/stimulusreflex/stimulus_reflex/pull/11) ([hopsoft](https://github.com/hopsoft))

**Closed issues:**

- Trying to get this working in Rails 6 [\#8](https://github.com/stimulusreflex/stimulus_reflex/issues/8)

## [v1.0.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v1.0.0) (2019-08-09)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.3.3...v1.0.0)

**Implemented enhancements:**

- Ruby function splat args return arity of -1 [\#9](https://github.com/stimulusreflex/stimulus_reflex/pull/9) ([leastbad](https://github.com/leastbad))

## [v0.3.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.3.3) (2019-05-13)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.3.2...v0.3.3)

## [v0.3.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.3.2) (2019-03-25)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.3.1...v0.3.2)

## [v0.3.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.3.1) (2019-03-01)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.3.0...v0.3.1)

## [v0.3.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.3.0) (2019-02-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.2.0...v0.3.0)

**Breaking changes:**

- Update naming conventions [\#7](https://github.com/stimulusreflex/stimulus_reflex/pull/7) ([hopsoft](https://github.com/hopsoft))

## [v0.2.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.2.0) (2018-11-16)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.12...v0.2.0)

**Implemented enhancements:**

- Explicit opt-in for ActionCable connection [\#6](https://github.com/stimulusreflex/stimulus_reflex/pull/6) ([hopsoft](https://github.com/hopsoft))

## [v0.1.12](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.12) (2018-11-03)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.10...v0.1.12)

## [v0.1.10](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.10) (2018-10-26)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.9...v0.1.10)

## [v0.1.9](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.9) (2018-10-24)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.8...v0.1.9)

**Closed issues:**

- URL helpers generate the wrong paths when page is rendered [\#1](https://github.com/stimulusreflex/stimulus_reflex/issues/1)

## [v0.1.8](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.8) (2018-10-22)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.7...v0.1.8)

**Fixed bugs:**

- Update env so url helpers work [\#2](https://github.com/stimulusreflex/stimulus_reflex/pull/2) ([hopsoft](https://github.com/hopsoft))

## [v0.1.7](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.7) (2018-10-21)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.6...v0.1.7)

## [v0.1.6](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.6) (2018-10-21)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.5...v0.1.6)

## [v0.1.5](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.5) (2018-10-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.4...v0.1.5)

## [v0.1.4](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.4) (2018-10-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.3...v0.1.4)

## [v0.1.3](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.3) (2018-10-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.2...v0.1.3)

## [v0.1.2](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.2) (2018-10-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.1...v0.1.2)

## [v0.1.1](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.1) (2018-10-20)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/v0.1.0...v0.1.1)

## [v0.1.0](https://github.com/stimulusreflex/stimulus_reflex/tree/v0.1.0) (2018-10-14)

[Full Changelog](https://github.com/stimulusreflex/stimulus_reflex/compare/bbd0d068aa40abb7d9f13deb099645dae3d5b3ed...v0.1.0)



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*
