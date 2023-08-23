import {expect, afterEach, beforeEach, vi} from 'vitest';
import {cleanup} from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
expect.extend(matchers);


afterEach(() => {
    vi.unmock('react-i18next');
    cleanup();
});

beforeEach(() => {
    vi.mock('react-i18next', () => ({
        useTranslation: () => ({
            t: (key) => key,
        }),
    }));
})
