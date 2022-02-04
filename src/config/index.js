'use script';

export default value();

function value() {
    console.log('Environment : ' + process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                responseCode: {
                    BAD_REQUEST: 400,
                    UNAUTHORIZED: 401,
                    SUCCESS: 200,
                },
                userType: {
                    Customer: 1,
                },
                host: process.env.IP,
                port: 80,
                socketPort: 8086,
                limit: 100,
                offset: 0,
                azure: {
                    accountName: 'pbblobstorage',
                    key: 'GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==',
                    url: ' https://pbblobstorage.blob.core.windows.net/',
                    containerName: 'product-box',
                    productFolderName: 'local/product/',
                    connectionString: 'DefaultEndpointsProtocol=https;AccountName=pbblobstorage;AccountKey=GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==;EndpointSuffix=core.windows.net'
                },
                accessKey: 'AKIA3Z4K4OTRWETBJ644',
                secretKey: '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',
                bucketName: 'dev-erden',
                imageUrlS3: 'https://dev-erden.s3.amazonaws.com/',
                currencyName : 'INR',
                oauthAccessTokenTime: 3601 * 24,
                oauthRefreshTokenTime: 1209601,
                oneWaySmsUrl: 'https://sgateway.onewaysms.com/apis10.aspx',
            };
        case 'local':
            return {
                responseCode: {
                    BAD_REQUEST: 400,
                    UNAUTHORIZED: 401,
                    SUCCESS: 200,
                },
                userType: {
                    Customer: 1,
                },
                host: process.env.IP,
                port: 8081,
                socketPort: 8086,
                limit: 100,
                offset: 0,
                azure: {
                    accountName: 'pbblobstorage',
                    key: 'GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==',
                    url: ' https://pbblobstorage.blob.core.windows.net/',
                    containerName: 'product-box',
                    productFolderName: 'local/product/',
                    connectionString: 'DefaultEndpointsProtocol=https;AccountName=pbblobstorage;AccountKey=GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==;EndpointSuffix=core.windows.net'
                },
                accessKey: 'AKIA3Z4K4OTRWETBJ644',
                secretKey: '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',
                bucketName: 'dev-erden',
                imageUrlS3: 'https://dev-erden.s3.amazonaws.com/',
                currencyName : 'INR',
                oauthAccessTokenTime: 3601 * 24,
                oauthRefreshTokenTime: 1209601,
                oneWaySmsUrl: 'https://sgateway.onewaysms.com/apis10.aspx',
            };
        case 'production':
            return {
                responseCode: {
                    BAD_REQUEST: 400,
                    UNAUTHORIZED: 401,
                    SUCCESS: 200,
                },
                userType: {
                    Customer: 1,
                },
                host: process.env.IP,
                port: 8080,
                socketPort: 8086,
                oauthAccessTokenTime: 3601 * 24,
                oauthRefreshTokenTime: 1209601,
            };
        default:
            return {
                responseCode: {
                    BAD_REQUEST: 400,
                    UNAUTHORIZED: 401,
                    SUCCESS: 200,
                },
                userType: {
                    Customer: 1,
                },
                host: process.env.IP,
                port: 8085,
                socketPort: 8086,
                azure: {
                    accountName: 'pbblobstorage',
                    key: 'GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==',
                    url: ' https://pbblobstorage.blob.core.windows.net/',
                    containerName: 'product-box',
                    productFolderName: 'local/product/',
                    connectionString: 'DefaultEndpointsProtocol=https;AccountName=pbblobstorage;AccountKey=GFWKEyizt9Ec8TQl3lS+4tizFMkKYHVn9shihfHfIRcttLWoMeWmwtXz7U9eZzGE9BkT+4keZ247z4EE7wGCsQ==;EndpointSuffix=core.windows.net'
                },
                oauthAccessTokenTime: 3601 * 24,
                oauthRefreshTokenTime: 1209601,
                oneWaySmsUrl: 'https://sgateway.onewaysms.com/apis10.aspx',
            };
    }
};