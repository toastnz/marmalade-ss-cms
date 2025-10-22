<?php

namespace Toast\MarmaladeSSCMS\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Control\Director;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class DebugViewExtension extends Extension
{
    public function onBeforeInit()
    {
        if (!Director::is_cli()) {
            $devCSSPath = ModuleResourceLoader::resourceURL('toastnz/marmalade-ss-cms: client/dist/styles/dev.css');
            echo '<link rel="stylesheet" href="' . $devCSSPath . '" />';
        }
    }
}
