<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>GreenSync</title>
        <link rel="icon" href="/favicon.ico" />
        
        {{-- Vite will inject all necessary CSS and JS here --}}
        @viteReactRefresh
        @vite('resources/js/main.tsx') {{-- CORRECTED to .tsx --}}
    </head>
    <body>
        {{-- React will take control of this div --}}
        <div id="root"></div>
    </body>
</html> 