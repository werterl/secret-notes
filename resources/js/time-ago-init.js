import TimeAgo from "javascript-time-ago";

import ru from "javascript-time-ago/locale/ru.json";
import en from "javascript-time-ago/locale/en.json";
import pl from "javascript-time-ago/locale/pl.json";
import de from "javascript-time-ago/locale/de.json";
import uk from "javascript-time-ago/locale/uk.json";

// Adding necessary localizations
TimeAgo.setDefaultLocale(en.locale);

[en, ru, pl, de, uk]
    .map(lang => TimeAgo.addLocale(lang));
