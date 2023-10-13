<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Models\Survey;
use App\Http\Resources\SurveyResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        //Check if image was given and save on local file system
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();

        if($survey->user_id !== $user->id) {
            return response()->json(['message' => 'This survey does not belong to you'], 403);
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $survey->update($request->validated());
        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($survey->user_id !== $user->id) {
            return response()->json(['message' => 'This survey does not belong to you'], 403);
        }

        $survey->delete();
        return response()->json(['message' => 'Survey deleted successfully'], 204);
    }

    private function saveImage($image){

        // Check if image is base64 string
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){

            // Take out the base64 encoded text without the data:image\/(\w+);base64 type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]);

            // Check if file is an image
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
                throw new \Exception('Invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if($image === false){
                throw new \Exception('Base64 decoding failed');
            }
        }
        else{
            throw new \Exception('Invalid image format');
            $image = file_get_contents($image);
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
