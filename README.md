# Fediverse Sharing Button

A fork of Stefan Bohacek's "Fediverse Sharing Button" modified to suit my needs.


## FAQ

### How does this work?

Some fediverse platforms let you [open a sharing prompt via a URL](https://stefanbohacek.com/blog/making-fediverse-apps-for-everyone/#sharing-dialog), much like many [corporate social media sites](https://stefanbohacek.com/blog/simple-sharing-buttons/#facebook).
This sharing button [detects the software](https://github.com/stefanbohacek/fediverse-info) running on the platform based on the provided URL, and shows a matching fediverse logo (courtesy of [Liaizon Wakest](https://fediverse.wake.st/)).

### Which platforms are supported?

- Diaspora
- Firefish
- Friendica
- Glitch-soc
- Hometown
- Hubzilla
- Lemmy (may be [broken on older versions](https://github.com/LemmyNet/lemmy-ui/issues/1913))
- Mastodon
- Misskey
- Sharkey

If your Fediverse software doesn't work, then that's a bit of a shame, try telling the developers to add support for Mastodon's share URL function.

### Is this really free to use?

Yep. Attribution and/or link back to the **original** project would be nice, but this isn't required.
If you have any extra cash, please support the original author [here](https://stefanbohacek.com/support-my-work/).

### Any way I can share feedback and suggestions?

No.

### What changes have you made to the original?

1. Removed JavaScript-isms. If you know, you know.
2. Removed dependency on the `fediverse-info` server, this client actually contacts the origin server to figure out its identity.

### Should I use this?

Probably not.

## Attribution

### Icons

- [fediverse.wake.st](https://fediverse.wake.st)
- [flowbite.com/icons](https://flowbite.com/icons)
- [svgrepo.com](https://www.svgrepo.com)