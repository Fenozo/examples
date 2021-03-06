import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import { registerThemeInjector } from '@dojo/framework/widget-core/mixins/Themed';
import { Registry } from '@dojo/framework/widget-core/Registry';
import Injector from '@dojo/framework/widget-core/Injector';
import App from './App';
import dojo from '@dojo/themes/dojo';

const themes: { [index: string]: any } = {
	dojo,
	vanilla: undefined
};

const registry = new Registry();
const themeContext = registerThemeInjector(dojo, registry);

registry.defineInjector('theme-context', () => {
	return () => ({
		get: () => themeContext,
		set: (theme: string) => themeContext.set(theme)
	});
});


let initialAppState = {
	registry,
	themes: Object.keys(themes),
	currentTheme: 'dojo',
	onThemeChange: _onThemechange
}

function _onThemechange(theme: string) {
	themeContext.set(themes[theme]);
	projector.setProperties({
		...initialAppState,
		currentTheme: theme
	});
}

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties(initialAppState);
projector.append();
