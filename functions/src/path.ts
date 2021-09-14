import * as ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
    '@config': __dirname + './config',
    '@middleware': __dirname + './middleware'
})