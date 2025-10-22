<?php

namespace Toast\MarmaladeSSCMS\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class LeftAndMainExtension extends Extension
{

    public function onInit()
    {
        Requirements::css('toastnz/marmalade-ss-cms: client/dist/styles/cms.css');
        Requirements::javascript('toastnz/marmalade-ss-cms: client/dist/scripts/dom-observer.js');
        Requirements::javascript('toastnz/marmalade-ss-cms: client/dist/scripts/cms.js');
    }
}
