/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getFredData = onRequest(
    { cors: ["localhost", "zakatcalc.web.app", "192.168.50.219"] },
    async (request, response) => {
        const fredResp = await fetch(
            `https://api.stlouisfed.org/fred/series/observations?series_id=${request.query.id}&api_key=ecc18b442eb865f0bf8399beaa01917e&limit=1&sort_order=desc&file_type=json`
        );

        const data = await fredResp.json();

        response.send(await data.observations[0]?.value || "N/A");
});
