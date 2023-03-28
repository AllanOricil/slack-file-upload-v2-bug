const { WebClient } = require('@slack/web-api');
const path = require('path');
const fs = require("fs");

const token = process.env.SLACK_TOKEN;
const channel = process.env.CHANNEL_ID;

// Initialize
const web = new WebClient(token);

(async function(){
	const filePath = path.resolve(__dirname, 'image.png');
	const file = fs.readFileSync(filePath);
	const files = [{file, filename: path.basename(filePath) }];

	//
	await web.filesUploadV2({
		file_uploads: files,
		initial_comment: "*Workflow:* <https://github.com/VodafoneIS/sf-metadata/actions/runs/4544996726|Deploy - Production>\n*Commit:* <https://github.com/VodafoneIS/sf-metadata/commit/7b8bbbc35affa5715e890340f9a9d5755aa09084|7b8bbbc35affa5715e890340f9a9d5755aa09084>",
		channel_id: channel
	})

	await web.files.upload({
		file,
		initial_comment: "*Workflow:* <https://github.com/VodafoneIS/sf-metadata/actions/runs/4544996726|Deploy - Production>\n*Commit:* <https://github.com/VodafoneIS/sf-metadata/commit/7b8bbbc35affa5715e890340f9a9d5755aa09084|7b8bbbc35affa5715e890340f9a9d5755aa09084>",
		channels: channel
	})
})();
