<?php

namespace Toast\MarmaladeSSCMS\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Control\Director;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class DevelopmentAdminExtension extends Extension
{
    public function onBeforeInit()
    {
        if (!Director::is_cli()){
            $devCSSPath = ModuleResourceLoader::resourceURL('toastnz/marmalade-ss-cms: client/dist/styles/dev.css');
            $devJSPath = ModuleResourceLoader::resourceURL('toastnz/marmalade-ss-cms: client/dist/scripts/dev.js');

            echo '<link rel="stylesheet" href="' . $devCSSPath . '" />';
            echo '<script src="' . $devJSPath . '"></script>';
        }
    }
}
