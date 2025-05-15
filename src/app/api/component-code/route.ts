import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { COMPONENT_CODE_MAP } from './code-map';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const componentPath = searchParams.get('path');
  
  if (!componentPath) {
    return NextResponse.json(
      { error: 'Component path is required' },
      { status: 400 }
    );
  }
  
  try {
    // Check if we have this component code in the pre-generated map
    if (COMPONENT_CODE_MAP[componentPath]) {
      return NextResponse.json({ code: COMPONENT_CODE_MAP[componentPath] });
    }
    
    // If not in the map and we're in development, try reading from file system
    if (process.env.NODE_ENV === 'development') {
      // Ensure we only access files within the project directory
      const filePath = path.join(process.cwd(), componentPath);
      const normalizedRequestPath = path.normalize(filePath);
      const normalizedProjectPath = path.normalize(process.cwd());
      
      // Security check to prevent directory traversal attacks
      if (!normalizedRequestPath.startsWith(normalizedProjectPath)) {
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        );
      }
      
      // Check if file exists
      if (!fs.existsSync(normalizedRequestPath)) {
        return NextResponse.json(
          { error: 'Component file not found' },
          { status: 404 }
        );
      }
      
      // Read the file
      const code = fs.readFileSync(normalizedRequestPath, 'utf8');
      
      return NextResponse.json({ code });
    }
    
    // If we're in production and the component is not in our map
    return NextResponse.json(
      { error: 'Component code not available' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error reading component code:', error);
    return NextResponse.json(
      { error: 'Failed to read component code' },
      { status: 500 }
    );
  }
} 