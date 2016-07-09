from fabric.api import task, run
from awsfabrictasks.s3.api import S3File, S3ConnectionWrapper, localpath_to_s3path

import sys
sys.path.append("./")

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)

@task
def push():
    bucket = S3ConnectionWrapper.get_bucket("alcorn-photos")
    website_files = ["index.html", "error.html", "main.js", "main.css"]
    for f in website_files:
        s3f = S3File.from_head(bucket, f)
        # import ipdb; ipdb.set_trace()
        try:
            s3f.exists()
        except AttributeError, e:
            s3f = S3File.raw(bucket, localpath_to_s3path("./", f, ""))
        try:
            s3f.set_contents_from_filename(f, overwrite=True)
        except IOError, e:
            logger.warning("No file found matching {}, skipping it...".format(f))
            pass
