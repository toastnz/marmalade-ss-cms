<?php

namespace Toast\MarmaladeSSCMS\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Model\ArrayData;
use SilverStripe\Model\List\ArrayList;
use SilverStripe\ORM\FieldType\DBField;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class PageExtension extends Extension
{

    public function getMarmaladeSSCMSJavaScriptPaths()
    {
        $paths = new ArrayList();

        $paths->push(new ArrayData([
            'Path' => ModuleResourceLoader::resourceURL('toastnz/marmalade-ss-cms: client/dist/scripts/seo-receiver.js')
        ]));

        return $paths;
    }

    public function getMarmaladeSSCMSPreviewScripts()
    {
        // Returns a script tag with: (async function() {
        // await import(pathA);
        // await import(pathB);
        // })();

        $files = $this->owner->getMarmaladeSSCMSJavaScriptPaths();

        $script = '<script type="module" defer>if (window.self !== window.top) (async function() {';
        foreach ($files as $file) $script .= 'await import("' . $file->Path . '");';
        $script .= '})();</script>';

        // Return as html
        return DBField::create_field('HTMLText', $script);
    }
}
