var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AboutBanner Model
 * ==========
 */

var AboutBanner = new keystone.List('AboutBanner', {
  map: { name: 'title' }
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/banner/',
      publicPath: './static/img/banner/',
  }
});

AboutBanner.add({
  title: { type: String, index: true, initial: true },
  image: { type: Types.File, storage: storage },
  altText: { type: String },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }
});

AboutBanner.relationship({ ref: 'Banner', path: 'banners', refPath: 'aboutBanner' });

AboutBanner.defaultColumns = 'title, image, altText, state';
AboutBanner.register();
